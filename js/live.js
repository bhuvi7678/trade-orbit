// =========================
// Trade Orbit V7 - live.js
// Part 1/4
// =========================

console.log("LIVE.JS LOADED");

let liveSocket = null;
let currentSymbol = null;
let reconnectTimer = null;
let reconnectAttempts = 0;

const MAX_RECONNECT = 10;

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
    shiba-inu: "shibusdt",
    bitcoin-cash: "bchusdt",
    near: "nearusdt",
    sui: "suiusdt",
    aptos: "aptusdt"

};

function getBinanceSymbol(coinId){

    return BINANCE_SYMBOLS[coinId] || null;

}

function startLivePrice(coinId){

    stopLivePrice();

    const symbol = getBinanceSymbol(coinId);

    if(!symbol){

        console.log("Binance symbol not found:", coinId);
        return;

    }

    currentSymbol = symbol;

    connectSocket(symbol);

}

function connectSocket(symbol){

    const url =
    `wss://stream.binance.com:9443/ws/${symbol}@ticker`;

    liveSocket = new WebSocket(url);

    liveSocket.onopen = () => {

        console.log("Socket Connected:", symbol);

        reconnectAttempts = 0;

    };
    // =========================
// Part 2/4
// =========================

    liveSocket.onmessage = (event) => {

        try {

            const data = JSON.parse(event.data);

            // Current Price
            const price = parseFloat(data.c);

            const priceElement =
                document.getElementById("detail-price");

            if (priceElement) {
                priceElement.innerHTML =
                    "$" + price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 8
                    });
            }

            // 24H Change
            const change = parseFloat(data.P);

            const changeElement =
                document.getElementById("detail-change");

            if (changeElement) {

                changeElement.innerHTML =
                    change.toFixed(2) + "%";

                changeElement.style.color =
                    change >= 0 ? "#22c55e" : "#ef4444";
            }

        } catch (err) {

            console.log("Live Parse Error:", err);

        }

    };

    liveSocket.onerror = (error) => {

        console.log("Socket Error:", error);

    };

    liveSocket.onclose = () => {

        console.log("Socket Closed");

        liveSocket = null;

        reconnect();

    };

}
// =========================
// Part 3/4
// =========================

function reconnect() {

    if (!currentSymbol) return;

    if (reconnectAttempts >= MAX_RECONNECT) {

        console.log("Maximum reconnect attempts reached.");
        return;

    }

    reconnectAttempts++;

    clearTimeout(reconnectTimer);

    reconnectTimer = setTimeout(() => {

        console.log(
            "Reconnecting...",
            reconnectAttempts
        );

        connectSocket(currentSymbol);

    }, 3000);

}

function stopLivePrice() {

    currentSymbol = null;

    clearTimeout(reconnectTimer);

    reconnectAttempts = 0;

    if (liveSocket) {

        liveSocket.onopen = null;
        liveSocket.onmessage = null;
        liveSocket.onerror = null;
        liveSocket.onclose = null;

        liveSocket.close();

        liveSocket = null;

    }

}
// =========================
// Part 4/4
// =========================

// Close socket when user leaves page
window.addEventListener("beforeunload", () => {
    stopLivePrice();
});

// Internet connection restored
window.addEventListener("online", () => {

    if (currentSymbol && !liveSocket) {

        console.log("Internet Restored");

        connectSocket(currentSymbol);

    }

});

// Internet disconnected
window.addEventListener("offline", () => {

    console.log("Internet Disconnected");

    stopLivePrice();

});

// Helper
function isLiveConnected() {

    return (
        liveSocket &&
        liveSocket.readyState === WebSocket.OPEN
    );

}

console.log("Trade Orbit Live Engine Ready");
