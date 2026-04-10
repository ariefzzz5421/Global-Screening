const DATA = {
  stocks: [
    { rank: 1, ticker: 'BBCA', name: 'Bank Central Asia', marketCap: 131.2, price: 10600, change: 0.9, insight: 'Bank terbesar di IDX dengan likuiditas tinggi dan ROE kuat.', trend: [8, 10, 9, 12, 14, 13, 15] },
    { rank: 2, ticker: 'BYAN', name: 'Bayan Resources', marketCap: 72.4, price: 20100, change: -0.6, insight: 'Eksposur ke batu bara thermal, sensitif ke harga komoditas global.', trend: [13, 12, 11, 10, 9, 8, 7] },
    { rank: 3, ticker: 'TLKM', name: 'Telkom Indonesia', marketCap: 27.8, price: 2920, change: 0.2, insight: 'Leader telekomunikasi dengan bisnis data center & digital.', trend: [7, 8, 7, 8, 9, 10, 10] },
    { rank: 4, ticker: 'BMRI', name: 'Bank Mandiri', marketCap: 48.3, price: 6025, change: 1.5, insight: 'Pertumbuhan kredit konsisten, kualitas aset membaik.', trend: [6, 7, 9, 10, 11, 12, 13] },
    { rank: 5, ticker: 'ASII', name: 'Astra International', marketCap: 15.2, price: 5075, change: -0.2, insight: 'Konglomerasi multi-sektor; otomotif + heavy equipment jadi pendorong.', trend: [11, 11, 10, 9, 8, 9, 10] },
    { rank: 6, ticker: 'BBRI', name: 'Bank Rakyat Indonesia', marketCap: 58.4, price: 5150, change: 1.1, insight: 'Fokus mikro dan UMKM, earnings defensif dalam siklus domestik.', trend: [8, 8, 9, 10, 11, 11, 12] },
    { rank: 7, ticker: 'AMMN', name: 'Amman Mineral', marketCap: 42.7, price: 6900, change: -1.2, insight: 'Eksposur copper-gold, volatil sejalan harga metal global.', trend: [15, 14, 12, 11, 10, 9, 8] },
    { rank: 8, ticker: 'TPIA', name: 'Chandra Asri Pacific', marketCap: 13.6, price: 8650, change: 0.3, insight: 'Petrokimia terintegrasi dengan katalis proyek ekspansi.', trend: [7, 6, 7, 8, 8, 9, 10] },
    { rank: 9, ticker: 'ICBP', name: 'Indofood CBP', marketCap: 10.7, price: 10800, change: 0.4, insight: 'Consumer defensive, margin terjaga pada segmen branded food.', trend: [9, 9, 10, 10, 11, 11, 12] },
    { rank: 10, ticker: 'DCII', name: 'DCI Indonesia', marketCap: 9.9, price: 184500, change: 2.1, insight: 'Data center play premium, dipengaruhi pertumbuhan cloud domestik.', trend: [5, 7, 9, 10, 13, 14, 16] }
  ],
  crypto: [
    { rank: 1, ticker: 'BTC', name: 'Bitcoin', marketCap: 1640, price: 82500, change: 2.4, insight: 'Aset kripto terbesar dan benchmark sentiment market.', trend: [8, 9, 10, 11, 12, 13, 14] },
    { rank: 2, ticker: 'ETH', name: 'Ethereum', marketCap: 460, price: 4050, change: 1.8, insight: 'Layer-1 utama untuk smart contract dan DeFi.', trend: [7, 7, 8, 9, 10, 12, 11] },
    { rank: 3, ticker: 'USDT', name: 'Tether', marketCap: 148, price: 1, change: 0.0, insight: 'Stablecoin dominan untuk likuiditas dan trading pair.', trend: [9, 9, 9, 9, 9, 9, 9] },
    { rank: 4, ticker: 'XRP', name: 'XRP', marketCap: 122, price: 2.11, change: -0.7, insight: 'Fokus pada transfer nilai lintas negara dan institusi.', trend: [12, 11, 10, 9, 8, 8, 7] },
    { rank: 5, ticker: 'BNB', name: 'BNB', marketCap: 96, price: 670, change: 0.5, insight: 'Token utilitas ekosistem BNB Chain & exchange.', trend: [8, 8, 9, 10, 10, 11, 12] },
    { rank: 6, ticker: 'SOL', name: 'Solana', marketCap: 88, price: 193, change: 3.1, insight: 'Ekosistem high-throughput dengan aktivitas on-chain tinggi.', trend: [6, 8, 10, 11, 13, 14, 15] },
    { rank: 7, ticker: 'USDC', name: 'USD Coin', marketCap: 60, price: 1, change: 0.0, insight: 'Stablecoin berbasis fiat dengan penggunaan institusional.', trend: [9, 9, 9, 9, 9, 9, 9] },
    { rank: 8, ticker: 'DOGE', name: 'Dogecoin', marketCap: 34, price: 0.24, change: -1.3, insight: 'Meme asset dengan volatilitas tinggi mengikuti sentiment retail.', trend: [11, 10, 9, 8, 7, 6, 5] },
    { rank: 9, ticker: 'ADA', name: 'Cardano', marketCap: 30, price: 0.82, change: 0.6, insight: 'Layer-1 proof-of-stake dengan fokus riset akademis.', trend: [7, 7, 8, 8, 9, 10, 10] },
    { rank: 10, ticker: 'TRX', name: 'TRON', marketCap: 23, price: 0.15, change: 0.4, insight: 'Jaringan blockchain dengan aktivitas stablecoin tinggi.', trend: [8, 9, 9, 10, 10, 11, 11] }
  ],
  macro: [
    { rank: 1, ticker: 'DXY', name: 'US Dollar Index', marketCap: null, price: 104.2, change: -0.3, insight: 'Mengukur kekuatan USD terhadap basket mata uang utama.', trend: [11, 10, 10, 9, 8, 8, 7] },
    { rank: 2, ticker: 'VIX', name: 'CBOE Volatility Index', marketCap: null, price: 17.4, change: 1.9, insight: 'Proxy risiko pasar saham AS (fear index).', trend: [5, 6, 7, 8, 9, 10, 11] },
    { rank: 3, ticker: 'SPX', name: 'S&P 500', marketCap: null, price: 5185, change: 0.8, insight: 'Indeks utama saham AS untuk risk-on/risk-off barometer.', trend: [8, 9, 10, 11, 12, 12, 13] },
    { rank: 4, ticker: 'EIDO', name: 'iShares MSCI Indonesia ETF', marketCap: null, price: 21.7, change: 0.5, insight: 'Representasi eksposur ekuitas Indonesia dalam bentuk ETF.', trend: [6, 6, 7, 8, 8, 9, 9] }
  ]
};

let activeTab = 'stocks';

const tabButtons = [...document.querySelectorAll('.tab')];
const assetGrid = document.getElementById('assetGrid');
const summaryCards = document.getElementById('summaryCards');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const template = document.getElementById('assetCardTemplate');
const dialog = document.getElementById('detailDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogBody = document.getElementById('dialogBody');

function formatMarketCap(asset) {
  if (asset.marketCap === null) return 'Market Cap: N/A';
  const unit = activeTab === 'stocks' ? 'B USD (approx)' : 'B USD';
  return `Market Cap: ${asset.marketCap.toLocaleString('id-ID')} ${unit}`;
}

function formatPrice(asset) {
  if (activeTab === 'stocks') return `Price: Rp${asset.price.toLocaleString('id-ID')}`;
  if (activeTab === 'crypto') return `Price: $${asset.price.toLocaleString('en-US')}`;
  return `Value: ${asset.price.toLocaleString('en-US')}`;
}

function createSparkline(container, points) {
  container.innerHTML = '';
  const max = Math.max(...points);
  points.forEach((point) => {
    const bar = document.createElement('span');
    bar.style.height = `${(point / max) * 100}%`;
    container.appendChild(bar);
  });
}

function renderSummary(data) {
  const total = data.length;
  const positive = data.filter((item) => item.change > 0).length;
  const negative = data.filter((item) => item.change < 0).length;
  const avgChange = data.reduce((acc, item) => acc + item.change, 0) / total;

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
    if (v1 === null) v1 = -Infinity;
    if (v2 === null) v2 = -Infinity;

    if (typeof v1 === 'string') {
      return direction === 'asc' ? v1.localeCompare(v2) : v2.localeCompare(v1);
    }

    return direction === 'asc' ? v1 - v2 : v2 - v1;
  });
}

function filterData(data) {
  const keyword = searchInput.value.trim().toLowerCase();
  if (!keyword) return data;
  return data.filter((asset) =>
    [asset.name, asset.ticker].some((value) => value.toLowerCase().includes(keyword))
  );
}

function renderAssets() {
  const baseData = DATA[activeTab];
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
    changeEl.textContent = `Daily Change: ${asset.change > 0 ? '+' : ''}${asset.change}%`;
    changeEl.classList.add(asset.change >= 0 ? 'up' : 'down');

    createSparkline(node.querySelector('.sparkline'), asset.trend);

    node.querySelector('.details-btn').addEventListener('click', () => {
      dialogTitle.textContent = `${asset.name} (${asset.ticker})`;
      dialogBody.textContent = asset.insight;
      dialog.showModal();
    });

    assetGrid.appendChild(node);
  });
}

function handleTabChange(nextTab) {
  activeTab = nextTab;
  tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === nextTab));
  searchInput.value = '';
  sortSelect.value = 'marketCap_desc';

  if (nextTab === 'macro') {
    sortSelect.value = 'change_desc';
  }

  renderAssets();
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

document.getElementById('closeDialog').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  const isOutside = event.target === dialog;
  if (isOutside) dialog.close();
});

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => handleTabChange(btn.dataset.tab));
});

searchInput.addEventListener('input', renderAssets);
sortSelect.addEventListener('change', renderAssets);

renderAssets();
