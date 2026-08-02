// =========================
// Trade Orbit V4 - search.js
// =========================

function setupSearch(){

    const searchBox = document.getElementById("search");

    if(!searchBox) return;


    searchBox.addEventListener("input", function(){

        const value = this.value.toLowerCase();


        const filteredCoins = cryptoData.filter(coin =>

            coin.name.toLowerCase().includes(value) ||

            coin.symbol.toLowerCase().includes(value)

        );


        if(typeof renderCoins === "function"){

            renderCoins(filteredCoins);

        }


    });

}
