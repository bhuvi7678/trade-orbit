let oldPrices = {};

function updatePrice(id, newPrice) {
  let element = document.getElementById(id);

  if (oldPrices[id]) {
    if (newPrice > oldPrices[id]) {
      element.className = "price-up";
      element.innerHTML = "$" + newPrice + " ↑";
    } 
    else if (newPrice < oldPrices[id]) {
      element.className = "price-down";
      element.innerHTML = "$" + newPrice + " ↓";
    }
    else {
      element.innerHTML = "$" + newPrice;
    }
  } 
  else {
    element.innerHTML = "$" + newPrice;
  }

  oldPrices[id] = newPrice;
}


function fetchPrices() {

  fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd&include_24hr_change=true")

  .then(response => response.json())

  .then(data => {

    updatePrice("bitcoin", data.bitcoin.usd);
    updatePrice("ethereum", data.ethereum.usd);
    updatePrice("bnb", data.binancecoin.usd);
    updatePrice("solana", data.solana.usd);


    document.getElementById("update-time").innerHTML =
    "Last Update: " + new Date().toLocaleTimeString();

  })

  .catch(error => {
    console.log("Price Error:", error);
  });

}


// First load
fetchPrices();


// Auto update every 05 seconds
setInterval(fetchPrices, 5000);

console.log("Script loaded");
document.getElementById("bitcoin-change").innerHTML =
"24h: " + data.bitcoin.usd_24h_change.toFixed(2) + "%";