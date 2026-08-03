// =========================
// Trade Orbit V8 - market.js
// =========================

function updateMarketOverview(coins) {

    if (!Array.isArray(coins) || coins.length === 0) return;

    const totalElement = document.getElementById("total-coins");
    const gainerElement = document.getElementById("top-gainer");
    const loserElement = document.getElementById("top-loser");

    if (totalElement) {
        totalElement.textContent = coins.length;
    }

    const valid = coins.filter(c =>
        typeof c.price_change_percentage_24h === "number"
    );

    if (valid.length === 0) return;

    const sorted = [...valid].sort(
        (a, b) =>
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
    );

    const topGainer = sorted[0];
    const topLoser = sorted[sorted.length - 1];

    if (gainerElement) {
        gainerElement.innerHTML = `
            <strong>${topGainer.name}</strong><br>
            <span class="positive">
                +${topGainer.price_change_percentage_24h.toFixed(2)}%
            </span>
        `;
    }

    if (loserElement) {
        loserElement.innerHTML = `
            <strong>${topLoser.name}</strong><br>
            <span class="negative">
                ${topLoser.price_change_percentage_24h.toFixed(2)}%
            </span>
        `;
    }
}

function getTopGainers(coins, limit = 5) {
    return [...coins]
        .sort((a,b)=>b.price_change_percentage_24h-a.price_change_percentage_24h)
        .slice(0, limit);
}

function getTopLosers(coins, limit = 5) {
    return [...coins]
        .sort((a,b)=>a.price_change_percentage_24h-b.price_change_percentage_24h)
        .slice(0, limit);
}
