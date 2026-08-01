function fetchPrices() {
  fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd")
    .then(response => response.json())
    .then(data => {

      document.getElementById("bitcoin").innerHTML =
        "$" + data.bitcoin.usd;

      document.getElementById("ethereum").innerHTML =
        "$" + data.ethereum.usd;

      document.getElementById("bnb").innerHTML =
        "$" + data.binancecoin.usd;

      document.getElementById("solana").innerHTML =
        "$" + data.solana.usd;

    })
    .catch(error => {
      console.log("Price Error:", error);
    });
}

// First load
fetchPrices();

// Auto update every 10 seconds
setInterval(fetchPrices, 10000);