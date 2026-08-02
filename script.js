let oldPrices = {};

function updatePrice(id, price){

    const el = document.getElementById(id);

    let arrow = "";

    if(oldPrices[id] !== undefined){

        if(price > oldPrices[id]){
            arrow = " ↑";
            el.className = "price price-up";
        }

        else if(price < oldPrices[id]){
            arrow = " ↓";
            el.className = "price price-down";
        }

        else{
            el.className = "price";
        }

    }else{
        el.className = "price";
    }

    el.innerHTML = "$" + Number(price).toLocaleString() + arrow;

    oldPrices[id] = price;

}

function updateChange(id, change){

    const el = document.getElementById(id);

    const value = Number(change).toFixed(2);

    if(change >= 0){
        el.className = "change positive";
        el.innerHTML = "24H : +" + value + "%";
    }else{
        el.className = "change negative";
        el.innerHTML = "24H : " + value + "%";
    }

}

function fetchPrices(){

fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd&include_24hr_change=true")

.then(response=>response.json())

.then(data=>{

updatePrice("bitcoin",data.bitcoin.usd);
updatePrice("ethereum",data.ethereum.usd);
updatePrice("bnb",data.binancecoin.usd);
updatePrice("solana",data.solana.usd);

updateChange("bitcoin-change",data.bitcoin.usd_24h_change);
updateChange("ethereum-change",data.ethereum.usd_24h_change);
updateChange("bnb-change",data.binancecoin.usd_24h_change);
updateChange("solana-change",data.solana.usd_24h_change);

document.getElementById("update-time").innerHTML =
"Last Updated : " + new Date().toLocaleTimeString();

})

.catch(error=>{

console.log(error);

});

}

fetchPrices();

setInterval(fetchPrices,5000);