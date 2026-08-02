// =========================
// Trade Orbit V7 - exchange.js
// =========================


const binanceSymbols = {

    bitcoin: "BTCUSDT",

    ethereum: "ETHUSDT",

    binancecoin: "BNBUSDT",

    solana: "SOLUSDT"

};


// Convert Coin ID to Binance Symbol

function getBinanceSymbol(coinId){

    return binanceSymbols[coinId];

}
