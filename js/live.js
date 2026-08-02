// =========================
// Trade Orbit V7 - live.js
// =========================

let liveSocket = null;

// CoinGecko ID -> Binance Symbol
const BINANCE_SYMBOLS = {
    bitcoin: "btcusdt",
    ethereum: "ethusdt",
    binancecoin: "bnbusdt",
    solana: "solusdt",
    ripple: "xrpusdt",
    cardano: "adausdt",
    dogecoin: "dogeusdt",
    tron: "trxusdt",
    toncoin: "tonusdt",
    chainlink: "linkusdt",
    avalanche: "avaxusdt",
    polkadot: "dotusdt",
    litecoin: "ltcusdt",
    shiba-inu: "shibusdt"
};

// Connect Binance WebSocket
function startLivePrice(coinId) {

    stopLivePrice();

    const symbol = BINANCE_SYMBOLS[coinId];

    if (!symbol) {
        console.log("No Binance Symbol:", coinId);
        return;
    }

    const url = `wss://stream.binance.com:9443/ws/${symbol}@ticker`;

    liveSocket = new WebSocket(url);

    liveSocket.onopen = () => {
        console.log("Live Connected:", symbol);
    };

    liveSocket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        const price = parseFloat(data.c);

        const priceElement = document.getElementById("detail-price");

        if (priceElement) {
            priceElement.innerHTML = "$" + price.toLocaleString();
        }
    };

    liveSocket.onerror = (err) => {
        console.log("WebSocket Error", err);
    };

    liveSocket.onclose = () => {
        console.log("Live Disconnected");
    };
}

// Close WebSocket
function stopLivePrice() {

    if (liveSocket) {
        liveSocket.close();
        liveSocket = null;
    }

}
