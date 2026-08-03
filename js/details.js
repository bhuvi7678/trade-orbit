// =========================
// Trade Orbit V8 - details.js
// =========================

let selectedCoin = null;
let liveTimer = null;

function openCoinDetails(coin){
    selectedCoin = coin;

    const modal = document.getElementById("coin-modal");
    if(!modal) return;

    modal.style.display = "flex";

    updateCoinDetails(coin);

    if(typeof loadCandlestickData === "function"){
        loadCandlestickData(coin.id);
    }

    startLivePrice();
}

function closeCoinDetails(){
    stopLivePrice();

    const modal = document.getElementById("coin-modal");
    if(modal){
        modal.style.display = "none";
    }

    selectedCoin = null;
}

function updateCoinDetails(coin){

    setValue("detail-name", coin.name);
    setValue("detail-symbol", coin.symbol.toUpperCase());
    setValue("detail-price", "$" + Number(coin.current_price).toLocaleString());
    setValue("detail-marketcap", formatMarketCap(coin.market_cap));
    setValue("detail-high", "$" + Number(coin.high_24h).toLocaleString());
    setValue("detail-low", "$" + Number(coin.low_24h).toLocaleString());
    setValue("detail-change", (coin.price_change_percentage_24h || 0).toFixed(2) + "%");
}

function startLivePrice(){

    stopLivePrice();

    liveTimer = setInterval(()=>{

        if(!selectedCoin) return;
        if(typeof cryptoData === "undefined") return;

        const latest = cryptoData.find(c=>c.id===selectedCoin.id);

        if(!latest) return;

        selectedCoin = latest;
        updateCoinDetails(latest);

    },5000);
}

function stopLivePrice(){
    if(liveTimer){
        clearInterval(liveTimer);
        liveTimer = null;
    }
}

function setValue(id,value){
    const el = document.getElementById(id);
    if(el) el.textContent = value;
}
