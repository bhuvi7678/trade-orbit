// =========================
// Trade Orbit V5 - details.js
// =========================

let selectedCoin = null;

// Open Coin Details
function openCoinDetails(coin) {

    selectedCoin = coin;

    const modal = document.getElementById("coin-modal");

    if (!modal) return;

    document.getElementById("detail-name").textContent =
        coin.name + " (" + coin.symbol.toUpperCase() + ")";

    document.getElementById("detail-price").textContent =
        "$" + coin.current_price.toLocaleString();

    document.getElementById("detail-change").textContent =
        coin.price_change_percentage_24h.toFixed(2) + "%";

    document.getElementById("detail-marketcap").textContent =
        "$" + coin.market_cap.toLocaleString();

    document.getElementById("detail-volume").textContent =
        "$" + coin.total_volume.toLocaleString();

    document.getElementById("detail-rank").textContent =
        "#" + coin.market_cap_rank;

    modal.style.display = "flex";

    // Future
    // loadCandlestickChart(coin.id);
    // loadIndicators(coin.id);
    // detectPatterns(coin.id);

}

// Close Modal
function closeCoinDetails() {

    const modal = document.getElementById("coin-modal");

    if (modal) {
        modal.style.display = "none";
    }

}

// Close on Outside Click
window.addEventListener("click", function(e){

    const modal = document.getElementById("coin-modal");

    if(e.target === modal){
        closeCoinDetails();
    }

});
