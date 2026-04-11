const REFRESH_INTERVAL_MS = 60000;

const ASSET_CONFIG = {
  stocks: [
    { rank: 1, ticker: 'BBCA', name: 'Bank Central Asia', yahoo: 'BBCA.JK', insight: 'Bank terbesar di IDX dengan likuiditas tinggi dan ROE kuat.' },
    { rank: 2, ticker: 'BYAN', name: 'Bayan Resources', yahoo: 'BYAN.JK', insight: 'Eksposur ke batu bara thermal, sensitif ke harga komoditas global.' },
    { rank: 3, ticker: 'TLKM', name: 'Telkom Indonesia', yahoo: 'TLKM.JK', insight: 'Leader telekomunikasi dengan bisnis data center & digital.' },
    { rank: 4, ticker: 'BMRI', name: 'Bank Mandiri', yahoo: 'BMRI.JK', insight: 'Pertumbuhan kredit konsisten, kualitas aset membaik.' },
    { rank: 5, ticker: 'ASII', name: 'Astra International', yahoo: 'ASII.JK', insight: 'Konglomerasi multi-sektor; otomotif + heavy equipment jadi pendorong.' },
    { rank: 6, ticker: 'BBRI', name: 'Bank Rakyat Indonesia', yahoo: 'BBRI.JK', insight: 'Fokus mikro dan UMKM, earnings defensif dalam siklus domestik.' },
    { rank: 7, ticker: 'AMMN', name: 'Amman Mineral', yahoo: 'AMMN.JK', insight: 'Eksposur copper-gold, volatil sejalan harga metal global.' },
    { rank: 8, ticker: 'TPIA', name: 'Chandra Asri Pacific', yahoo: 'TPIA.JK', insight: 'Petrokimia terintegrasi dengan katalis proyek ekspansi.' },
    { rank: 9, ticker: 'ICBP', name: 'Indofood CBP', yahoo: 'ICBP.JK', insight: 'Consumer defensive, margin terjaga pada segmen branded food.' },
    { rank: 10, ticker: 'DCII', name: 'DCI Indonesia', yahoo: 'DCII.JK', insight: 'Data center play premium, dipengaruhi pertumbuhan cloud domestik.' }
  ],
  crypto: [
    { rank: 1, ticker: 'BTC', id: 'bitcoin', name: 'Bitcoin', insight: 'Aset kripto terbesar dan benchmark sentiment market.' },
    { rank: 2, ticker: 'ETH', id: 'ethereum', name: 'Ethereum', insight: 'Layer-1 utama untuk smart contract dan DeFi.' },
    { rank: 3, ticker: 'USDT', id: 'tether', name: 'Tether', insight: 'Stablecoin dominan untuk likuiditas dan trading pair.' },
    { rank: 4, ticker: 'XRP', id: 'ripple', name: 'XRP', insight: 'Fokus pada transfer nilai lintas negara dan institusi.' },
    { rank: 5, ticker: 'BNB', id: 'binancecoin', name: 'BNB', insight: 'Token utilitas ekosistem BNB Chain & exchange.' },
    { rank: 6, ticker: 'SOL', id: 'solana', name: 'Solana', insight: 'Ekosistem high-throughput dengan aktivitas on-chain tinggi.' },
    { rank: 7, ticker: 'USDC', id: 'usd-coin', name: 'USD Coin', insight: 'Stablecoin berbasis fiat dengan penggunaan institusional.' },
    { rank: 8, ticker: 'DOGE', id: 'dogecoin', name: 'Dogecoin', insight: 'Meme asset dengan volatilitas tinggi mengikuti sentiment retail.' },
    { rank: 9, ticker: 'ADA', id: 'cardano', name: 'Cardano', insight: 'Layer-1 proof-of-stake dengan fokus riset akademis.' },
    { rank: 10, ticker: 'TRX', id: 'tron', name: 'TRON', insight: 'Jaringan blockchain dengan aktivitas stablecoin tinggi.' }
  ],
  macro: [
    { rank: 1, ticker: 'DXY', name: 'US Dollar Index', yahoo: 'DX-Y.NYB', insight: 'Mengukur kekuatan USD terhadap basket mata uang utama.' },
    { rank: 2, ticker: 'VIX', name: 'CBOE Volatility Index', yahoo: '^VIX', insight: 'Proxy risiko pasar saham AS (fear index).' },
    { rank: 3, ticker: 'SPX', name: 'S&P 500', yahoo: '^GSPC', insight: 'Indeks utama saham AS untuk risk-on/risk-off barometer.' },
    { rank: 4, ticker: 'EIDO', name: 'iShares MSCI Indonesia ETF', yahoo: 'EIDO', insight: 'Representasi eksposur ekuitas Indonesia dalam bentuk ETF.' }
  ]
};

let activeTab = 'stocks';
let chartMode = 'line';
let isLoading = false;
let lastUpdated = '-';

const marketState = { stocks: [], crypto: [], macro: [] };
const previousState = { stocks: [], crypto: [], macro: [] };

const tabButtons = [...document.querySelectorAll('.tab')];
const assetGrid = document.getElementById('assetGrid');
const summaryCards = document.getElementById('summaryCards');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const template = document.getElementById('assetCardTemplate');
const dialog = document.getElementById('detailDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogBody = document.getElementById('dialogBody');
const refreshButton = document.getElementById('refreshButton');
const statusText = document.getElementById('statusText');
const chartModeButtons = [...document.querySelectorAll('.chart-mode-btn')];

function normalizeTrend(series = []) {
  const values = series.filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (values.length >= 7) return values.slice(-7);
  if (values.length === 0) return [1, 1, 1, 1, 1, 1, 1];
  const padded = [...values];
  while (padded.length < 7) padded.unshift(values[0]);
  return padded;
}

function formatMarketCap(asset) {
  if (asset.marketCap === null || asset.marketCap === undefined) return 'Market Cap: N/A';
  const unit = 'B USD';
  return `Market Cap: ${asset.marketCap.toLocaleString('id-ID', { maximumFractionDigits: 2 })} ${unit}`;
}

function formatPrice(asset) {
  if (activeTab === 'stocks') return `Price: Rp${asset.price.toLocaleString('id-ID')}`;
  if (activeTab === 'crypto') return `Price: $${asset.price.toLocaleString('en-US')}`;
  return `Value: ${asset.price.toLocaleString('en-US')}`;
}

function getTrendSVG(points, mode) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const diff = max - min || 1;
  const xStep = 100 / (points.length - 1);

  const mapped = points.map((p, i) => {
    const x = i * xStep;
    const y = 100 - ((p - min) / diff) * 100;
    return `${x},${y}`;
  });

  if (mode === 'bar') {
    const barWidth = 100 / points.length - 2;
    const bars = points
      .map((point, idx) => {
        const h = ((point - min) / diff) * 100;
        const x = idx * (barWidth + 2);
        const y = 100 - h;
        return `<rect x="${x}" y="${y}" width="${barWidth}" height="${Math.max(h, 2)}" rx="2" />`;
      })
      .join('');
    return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="sparkline-svg bar-mode">${bars}</svg>`;
  }

  return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="sparkline-svg line-mode"><polyline points="${mapped.join(' ')}" /><polyline class="fill" points="0,100 ${mapped.join(' ')} 100,100"/></svg>`;
}

function renderSummary(data) {
  const total = data.length;
  const positive = data.filter((item) => item.change > 0).length;
  const negative = data.filter((item) => item.change < 0).length;
  const avgChange = total > 0 ? data.reduce((acc, item) => acc + item.change, 0) / total : 0;

  summaryCards.innerHTML = `
    <article class="summary-card"><p>Total Asset</p><h3>${total}</h3></article>
    <article class="summary-card"><p>Naik Hari Ini</p><h3>${positive}</h3></article>
    <article class="summary-card"><p>Turun Hari Ini</p><h3>${negative}</h3></article>
    <article class="summary-card"><p>Rata-rata Perubahan</p><h3>${avgChange.toFixed(2)}%</h3></article>
  `;
}

function sortData(data) {
  const [field, direction] = sortSelect.value.split('_');
  return [...data].sort((a, b) => {
    let v1 = a[field];
    let v2 = b[field];
    if (v1 === null || v1 === undefined) v1 = -Infinity;
    if (v2 === null || v2 === undefined) v2 = -Infinity;

    if (typeof v1 === 'string') {
      return direction === 'asc' ? v1.localeCompare(v2) : v2.localeCompare(v1);
    }

    return direction === 'asc' ? v1 - v2 : v2 - v1;
  });
}

function filterData(data) {
  const keyword = searchInput.value.trim().toLowerCase();
  if (!keyword) return data;
  return data.filter((asset) => [asset.name, asset.ticker].some((value) => value.toLowerCase().includes(keyword)));
}

function renderAssets() {
  const baseData = marketState[activeTab] || [];
  const filtered = filterData(baseData);
  const sorted = sortData(filtered);

  renderSummary(filtered);
  assetGrid.innerHTML = '';

  if (sorted.length === 0) {
    assetGrid.innerHTML = '<p>Tidak ada hasil untuk pencarian ini.</p>';
    return;
  }

  sorted.forEach((asset) => {
    const node = template.content.cloneNode(true);
    node.querySelector('.ticker').textContent = `#${asset.rank} ${asset.ticker}`;
    node.querySelector('.name').textContent = asset.name;
    node.querySelector('.badge').textContent = activeTab.toUpperCase();
    node.querySelector('.market-cap').textContent = formatMarketCap(asset);
    node.querySelector('.price').textContent = formatPrice(asset);

    const changeEl = node.querySelector('.change');
    changeEl.textContent = `Daily Change: ${asset.change > 0 ? '+' : ''}${asset.change.toFixed(2)}%`;
    changeEl.classList.add(asset.change >= 0 ? 'up' : 'down');

    node.querySelector('.sparkline').innerHTML = getTrendSVG(asset.trend, chartMode);

    node.querySelector('.details-btn').addEventListener('click', () => {
      dialogTitle.textContent = `${asset.name} (${asset.ticker})`;
      dialogBody.textContent = `${asset.insight} Last update: ${lastUpdated}`;
      dialog.showModal();
    });

    assetGrid.appendChild(node);
  });
}

function setStatus(message) {
  statusText.textContent = message;
}

async function fetchWithFallback(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      return await response.json();
    } catch (error) {
      continue;
    }
  }
  throw new Error('All providers failed');
}

async function fetchYahooQuotes(symbols) {
  const encoded = encodeURIComponent(symbols.join(','));
  const urls = [
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encoded}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`)}`
  ];
  const json = await fetchWithFallback(urls);
  return json.quoteResponse?.result || [];
}

async function fetchYahooHistory(symbol) {
  const chartUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=7d&interval=1d`;
  try {
    const json = await fetchWithFallback([
      chartUrl,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(chartUrl)}`
    ]);
    const points = json.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
    return normalizeTrend(points);
  } catch {
    return [1, 2, 3, 4, 3, 5, 6];
  }
}

async function fetchCryptoData() {
  const ids = ASSET_CONFIG.crypto.map((c) => c.id).join(',');
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Crypto provider failed');
  const rows = await response.json();
  const map = new Map(rows.map((r) => [r.id, r]));

  return ASSET_CONFIG.crypto.map((base) => {
    const row = map.get(base.id);
    const fallback = previousState.crypto.find((p) => p.id === base.id);
    return {
      ...base,
      marketCap: row ? row.market_cap / 1_000_000_000 : fallback?.marketCap ?? null,
      price: row ? row.current_price : fallback?.price ?? 0,
      change: row ? row.price_change_percentage_24h ?? 0 : fallback?.change ?? 0,
      trend: normalizeTrend(row?.sparkline_in_7d?.price ?? fallback?.trend)
    };
  });
}

async function fetchStocksAndMacro() {
  const list = [...ASSET_CONFIG.stocks, ...ASSET_CONFIG.macro];
  const quotes = await fetchYahooQuotes(list.map((a) => a.yahoo));
  const quoteMap = new Map(quotes.map((q) => [q.symbol, q]));

  const trends = await Promise.all(list.map((asset) => fetchYahooHistory(asset.yahoo)));
  const trendMap = new Map(list.map((asset, idx) => [asset.yahoo, trends[idx]]));

  const mapAsset = (asset, key) => {
    const row = quoteMap.get(asset.yahoo);
    const fallback = previousState[key].find((p) => p.ticker === asset.ticker);

    return {
      ...asset,
      marketCap: row?.marketCap ? row.marketCap / 1_000_000_000 : fallback?.marketCap ?? null,
      price: row?.regularMarketPrice ?? fallback?.price ?? 0,
      change: row?.regularMarketChangePercent ?? fallback?.change ?? 0,
      trend: trendMap.get(asset.yahoo) || fallback?.trend || [1, 2, 3, 4, 5, 6, 7]
    };
  };

  return {
    stocks: ASSET_CONFIG.stocks.map((asset) => mapAsset(asset, 'stocks')),
    macro: ASSET_CONFIG.macro.map((asset) => mapAsset(asset, 'macro'))
  };
}

async function loadMarketData({ silent = false } = {}) {
  if (isLoading) return;
  isLoading = true;
  if (!silent) setStatus('Mengambil data real-time...');

  try {
    const [crypto, stockMacro] = await Promise.all([fetchCryptoData(), fetchStocksAndMacro()]);

    previousState.stocks = marketState.stocks;
    previousState.crypto = marketState.crypto;
    previousState.macro = marketState.macro;

    marketState.crypto = crypto;
    marketState.stocks = stockMacro.stocks;
    marketState.macro = stockMacro.macro;

    lastUpdated = new Date().toLocaleString('id-ID', { hour12: false });
    setStatus(`Real-time aktif · Last update: ${lastUpdated}`);
    renderAssets();
  } catch (error) {
    setStatus('Gagal mengambil data live. Menampilkan data terakhir yang tersedia.');
    if (marketState[activeTab].length === 0) {
      marketState.stocks = ASSET_CONFIG.stocks.map((a) => ({ ...a, marketCap: null, price: 0, change: 0, trend: [1, 2, 3, 4, 5, 6, 7] }));
      marketState.crypto = ASSET_CONFIG.crypto.map((a) => ({ ...a, marketCap: null, price: 0, change: 0, trend: [1, 2, 3, 4, 5, 6, 7] }));
      marketState.macro = ASSET_CONFIG.macro.map((a) => ({ ...a, marketCap: null, price: 0, change: 0, trend: [1, 2, 3, 4, 5, 6, 7] }));
      renderAssets();
    }
  } finally {
    isLoading = false;
  }
}

function handleTabChange(nextTab) {
  activeTab = nextTab;
  tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === nextTab));
  searchInput.value = '';
  sortSelect.value = nextTab === 'macro' ? 'change_desc' : 'marketCap_desc';
  renderAssets();
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

refreshButton.addEventListener('click', () => loadMarketData());

document.getElementById('closeDialog').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => handleTabChange(btn.dataset.tab));
});

chartModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chartMode = button.dataset.mode;
    chartModeButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderAssets();
  });
});

searchInput.addEventListener('input', renderAssets);
sortSelect.addEventListener('change', renderAssets);

loadMarketData();
setInterval(() => loadMarketData({ silent: true }), REFRESH_INTERVAL_MS);
