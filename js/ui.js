// =========================
// Trade Orbit V8 Pro - ui.js
// =========================

function renderCoins(coins) {

    const container = document.getElementById("crypto-container");

    if (!container) return;

    container.innerHTML = "";

    if (!Array.isArray(coins) || !coins.length) {

        container.innerHTML =
            "<h2 style='text-align:center'>No Coins Found</h2>";

        return;

    }

    coins.slice(0, 20).forEach((coin) => {

        const change = Number(coin.price_change_percentage_24h || 0);

        const trend =
            change >= 0 ? "positive" : "negative";

        const arrow =
            change >= 0 ? "▲" : "▼";

        const card = document.createElement("div");

        card.className = "coin-card";

        card.dataset.coin = coin.id;

        card.addEventListener("click", () => {

            if (typeof openCoinDetails === "function") {

                openCoinDetails(coin);

            }

        });

        card.innerHTML = `

<div class="coin-info">

<img class="coin-logo"
src="${coin.image}"
alt="${coin.name}">

<div>

<h2 class="coin-name">
${coin.name}
</h2>

<p class="coin-symbol">
${coin.symbol.toUpperCase()}
</p>

</div>

</div>

<div class="coin-price">

<h3 class="live-price">
$${Number(coin.current_price).toLocaleString()}
</h3>

<span class="${trend}">

${arrow} ${change.toFixed(2)}%

</span>

</div>

<div class="coin-stats">

<p>🏆 Rank #${coin.market_cap_rank}</p>

<p>💰 ${formatMarketCap(coin.market_cap)}</p>

<p>📈 High $${Number(coin.high_24h).toLocaleString()}</p>

<p>📉 Low $${Number(coin.low_24h).toLocaleString()}</p>

</div>

<div class="sparkline-box">

<canvas
id="${coin.id}-chart"
class="sparkline"
width="220"
height="60">
</canvas>

</div>

`;

        container.appendChild(card);

        if (
            coin.sparkline_in_7d &&
            coin.sparkline_in_7d.price &&
            typeof createSparkline === "function"
        ) {

            requestAnimationFrame(() => {

                createSparkline(

                    `${coin.id}-chart`,

                    coin.sparkline_in_7d.price

                );

            });

        }

    });

}

// =========================
// Format Market Cap
// =========================

function formatMarketCap(value) {

    value = Number(value || 0);

    if (value >= 1e12)
        return "$" + (value / 1e12).toFixed(2) + " T";

    if (value >= 1e9)
        return "$" + (value / 1e9).toFixed(2) + " B";

    if (value >= 1e6)
        return "$" + (value / 1e6).toFixed(2) + " M";

    if (value >= 1e3)
        return "$" + (value / 1e3).toFixed(2) + " K";

    return "$" + value.toLocaleString();

}
