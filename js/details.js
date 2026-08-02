// =========================
// Trade Orbit V6 - details.js
// =========================

let selectedCoin = null;


// Open Coin Details
function openCoinDetails(coin){

    selectedCoin = coin;

    const modal = document.getElementById("coin-modal");

    if(!modal) return;


    document.getElementById("detail-name").innerHTML =
        coin.name + " (" + coin.symbol.toUpperCase() + ")";


    document.getElementById("detail-price").innerHTML =
        "$" + coin.current_price.toLocaleString();


    document.getElementById("detail-change").innerHTML =
        coin.price_change_percentage_24h.toFixed(2) + "%";


    document.getElementById("detail-marketcap").innerHTML =
        "$" + coin.market_cap.toLocaleString();


    document.getElementById("detail-volume").innerHTML =
        "$" + coin.total_volume.toLocaleString();


    document.getElementById("detail-rank").innerHTML =
        "#" + coin.market_cap_rank;


    modal.style.display = "flex";


    // Load Candlestick
    loadCandlestickData(coin.id);

}



// Fetch Candlestick Data
async function loadCandlestickData(coinId){
   ...
}

    try{

        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=7`
        );


        const ohlc = await response.json();

        console.log("OHLC DATA:", ohlc);


        const candleData = ohlc.map(item => ({

            time: Math.floor(item[0] / 1000),
            open:item[1],
            high:item[2],
            low:item[3],
            close:item[4]

        }));


        createCandlestickChart(candleData);


    }

    catch(error){

        console.log("Chart Error:",error);

    }

}



// Close Modal

function closeCoinDetails(){

    const modal =
    document.getElementById("coin-modal");

    if(modal){
        modal.style.display="none";
    }

}
