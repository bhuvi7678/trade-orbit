// =========================
// Trade Orbit V4 - ui.js
// =========================

function renderCoins(coins) {

    const container = document.getElementById("crypto-container");

    if (!container) return;

    container.innerHTML = "";


    coins.forEach(coin => {

        const changeClass =
            coin.price_change_percentage_24h >= 0
            ? "positive"
            : "negative";


        const card = document.createElement("div");

        card.className = "coin-card";


        card.innerHTML = `

            <img 
            class="coin-logo"
            src="${coin.image}"
            alt="${coin.name}"
            >

            <h2 class="coin-name">
            ${coin.name}
            </h2>

            <p class="coin-symbol">
            ${coin.symbol.toUpperCase()}
            </p>


            <p class="price">
            $${coin.current_price.toLocaleString()}
            </p>


            <p class="change ${changeClass}">
            24H :
            ${coin.price_change_percentage_24h.toFixed(2)}%
            </p>


            <div class="coin-info">

            <p>
            🏆 Rank : #${coin.market_cap_rank}
            </p>

            <p>
            💰 Market Cap :
            $${formatMarketCap(coin.market_cap)}
            </p>

            <p>
            📈 High :
            $${coin.high_24h.toLocaleString()}
            </p>

            <p>
            📉 Low :
            $${coin.low_24h.toLocaleString()}
            </p>

            </div>

        `;

        // Sparkline Chart

let chartData = coin.sparkline_in_7d.price;

let min = Math.min(...chartData);
let max = Math.max(...chartData);

let points = chartData.map((price, index) => {

    let x = (index / (chartData.length - 1)) * 100;

    let y = 100 - ((price - min) / (max - min)) * 100;

    return `${x},${y}`;

}).join(" ");

        container.appendChild(card);

    });

}


// Market Cap Format

function formatMarketCap(value){

    if(value >= 1e12){

        return (value / 1e12).toFixed(2) + "T";

    }

    if(value >= 1e9){

        return (value / 1e9).toFixed(2) + "B";

    }

    if(value >= 1e6){

        return (value / 1e6).toFixed(2) + "M";

    }

    return value;

}
