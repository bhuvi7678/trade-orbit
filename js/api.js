// =========================
// Trade Orbit V4 - api.js
// =========================

// Global Store
let cryptoData = [];

// CoinGecko API
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h";

// Fetch Top 100 Coins
async function fetchCryptoData() {
  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API Error");
    }

    cryptoData = await response.json();

    console.log("Loaded:", cryptoData.length, "coins");

    // Ye functions baad me ui.js aur market.js me banenge
    if (typeof renderCoins === "function") {
      renderCoins(cryptoData);
    }

    if (typeof updateMarketOverview === "function") {
      updateMarketOverview(cryptoData);
    }

    updateTime();

  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

// Last Update Time
function updateTime() {
  const element = document.getElementById("update-time");

  if (element) {
    element.textContent =
      "Last Updated: " + new Date().toLocaleTimeString();
  }
}

// Auto Refresh (30 sec)
setInterval(fetchCryptoData, 30000);
