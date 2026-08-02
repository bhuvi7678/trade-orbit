// =========================
// Trade Orbit V6 - details.js
// =========================

let selectedCoin = null;


// Open Coin Details

function openCoinDetails(coin){

    selectedCoin = coin;


    const modal = document.getElementById("coin-modal");

    if(!modal) return;


    document.getElementById("detail-name").textContent =
    coin.name + " (" + coin.symbol.toUpperCase() + ")";


    document.getElementById("detail-price").textContent =
    "$" + coin.current_price.toLocaleString();


    document.getElementById("detail-change").textContent =
    coin.price_change_percentage_24h.toFixed(2) + "%";


    document.getElementById("detail-marketcap").textContent =
    "$" + coin.market_cap.toLocaleString();


    document.getElementById("detail-volume").textContent =
    "$" + coin.total_volume.toLocaleString();


    document.getElementById("detail-rank").textContent =
    "#" + coin.market_cap_rank;



    modal.style.display = "flex";


    // Load Candlestick Chart

    loadCandlestickData(coin.id);

}



// Close Modal

function closeCoinDetails(){

    const modal =
    document.getElementById("coin-modal");


    if(modal){

        modal.style.display="none";

    }

}



// Fetch OHLC Data

async function loadCandlestickData(id){


    try{


        const response = await fetch(

        `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=7`

        );


        const ohlc = await response.json();
        console.log(ohlc);



        const candleData = ohlc.map(item => ({

            time: item[0] / 1000,

            open: item[1],

            high: item[2],

            low: item[3],

            close: item[4]

        }));



        createCandlestickChart(candleData);



    }


    catch(error){

        console.log(
            "Chart Error:",
            error
        );

    }

}




// Close outside click

window.addEventListener("click",function(e){

    const modal =
    document.getElementById("coin-modal");


    if(e.target === modal){

        closeCoinDetails();

    }

});
