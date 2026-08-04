// =========================
// Trade Orbit V8 Pro - market.js
// =========================

// Update Overview
function updateMarketOverview(coins) {

    if (!Array.isArray(coins) || !coins.length) return;

    const totalCoins = document.getElementById("total-coins");
    const topGainer = document.getElementById("top-gainer");
    const topLoser = document.getElementById("top-loser");

    if (totalCoins) {
        totalCoins.textContent = coins.length;
    }

    const validCoins = coins.filter(
        coin => typeof coin.price_change_percentage_24h === "number"
    );

    if (!validCoins.length) return;

    let gainer = validCoins[0];
    let loser = validCoins[0];

    let totalMarketCap = 0;
    let totalChange = 0;

    validCoins.forEach((coin) => {

        totalMarketCap += Number(coin.market_cap || 0);

        totalChange += Number(
            coin.price_change_percentage_24h || 0
        );

        if (
            coin.price_change_percentage_24h >
            gainer.price_change_percentage_24h
        ) {
            gainer = coin;
        }

        if (
            coin.price_change_percentage_24h <
            loser.price_change_percentage_24h
        ) {
            loser = coin;
        }

    });

    if (topGainer) {

        topGainer.innerHTML = `

<strong>${gainer.name}</strong><br>

<span class="positive">

▲ ${gainer.price_change_percentage_24h.toFixed(2)}%

</span>

`;

    }

    if (topLoser) {

        topLoser.innerHTML = `

<strong>${loser.name}</strong><br>

<span class="negative">

▼ ${loser.price_change_percentage_24h.toFixed(2)}%

</span>

`;

    }

    // Future Use
    window.marketSummary = {

        totalCoins: validCoins.length,

        totalMarketCap,

        averageChange:
            totalChange / validCoins.length,

        topGainer: gainer,

        topLoser: loser

    };

}

// =========================
// Top Gainers
// =========================

function getTopGainers(coins, limit = 5) {

    return [...coins]

        .filter(
            c => typeof c.price_change_percentage_24h === "number"
        )

        .sort(
            (a, b) =>
                b.price_change_percentage_24h -
                a.price_change_percentage_24h
        )

        .slice(0, limit);

}

// =========================
// Top Losers
// =========================

function getTopLosers(coins, limit = 5) {

    return [...coins]

        .filter(
            c => typeof c.price_change_percentage_24h === "number"
        )

        .sort(
            (a, b) =>
                a.price_change_percentage_24h -
                b.price_change_percentage_24h
        )

        .slice(0, limit);

}
