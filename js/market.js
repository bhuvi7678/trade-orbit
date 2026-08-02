// =========================
// Trade Orbit V4 - market.js
// =========================

function updateMarketOverview(coins){

    if(!coins || coins.length === 0) return;


    // Sort by 24h change

    let sortedCoins = [...coins].sort(

        (a,b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h

    );


    let topGainer = sortedCoins[0];

    let topLoser = sortedCoins[sortedCoins.length - 1];


    const gainer =
    document.getElementById("top-gainer");


    const loser =
    document.getElementById("top-loser");


    if(gainer){

        gainer.innerHTML =
        `${topGainer.name} +${topGainer.price_change_percentage_24h.toFixed(2)}%`;

    }


    if(loser){

        loser.innerHTML =
        `${topLoser.name} ${topLoser.price_change_percentage_24h.toFixed(2)}%`;

    }


    const total =
    document.getElementById("total-coins");


    if(total){

        total.innerHTML = coins.length;

    }

}
