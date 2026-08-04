// =========================
// Trade Orbit V8 - details.js
// =========================

let selectedCoin = null;
let livePriceTimer = null;

// =========================
// Open Coin Details
// =========================

function openCoinDetails(coin) {

    if (!coin) return;

    selectedCoin = coin;

    const modal = document.getElementById("coin-modal");

    if (!modal) return;

    modal.style.display = "flex";

    updateCoinDetails(coin);

    if (typeof loadCandlestickData === "function") {
        loadCandlestickData(coin.id);
    }

    startLivePrice();

}

// =========================
// Close Modal
// =========================

function closeCoinDetails() {

    stopLivePrice();

    if (typeof destroyCandlestickChart === "function") {
        destroyCandlestickChart();
    }

    const modal = document.getElementById("coin-modal");

    if (modal) {
        modal.style.display = "none";
    }

    selectedCoin = null;

}

// =========================
// Update Coin Info
// =========================

function updateCoinDetails(coin) {

    if (!coin) return;

    setText("detail-name", coin.name);

    setText("detail-price",
        "$" + Number(coin.current_price).toLocaleString());

    setText("detail-change",
        (coin.price_change_percentage_24h || 0).toFixed(2) + "%");

    setText("detail-marketcap",
        formatMarketCap(coin.market_cap));

    setText("detail-volume",
        "$" + Number(coin.total_volume).toLocaleString());

    setText("detail-rank",
        "#" + coin.market_cap_rank);

}

// =========================
// Live Update
// =========================

function startLivePrice() {

    stopLivePrice();

    livePriceTimer = setInterval(() => {

        if (!selectedCoin) return;

        if (typeof cryptoData === "undefined") return;

        const latest = cryptoData.find(c => c.id === selectedCoin.id);

        if (!latest) return;

        selectedCoin = latest;

        updateCoinDetails(latest);

    }, 5000);

}

// =========================
// Stop Live Update
// =========================

function stopLivePrice() {

    if (livePriceTimer) {

        clearInterval(livePriceTimer);

        livePriceTimer = null;

    }

}

// =========================
// Safe Text Update
// =========================

function setText(id, value) {

    const el = document.getElementById(id);

    if (el) {

        el.textContent = value;

    }

}

// =========================
// Close on Outside Click
// =========================

window.addEventListener("click", function (e) {

    const modal = document.getElementById("coin-modal");

    if (!modal) return;

    if (e.target === modal) {

        closeCoinDetails();

    }

});
