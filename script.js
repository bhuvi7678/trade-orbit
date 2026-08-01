async function getCryptoPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    );

    const data = await response.json();

    document.getElementById("bitcoin").innerHTML =
      "$" + data.bitcoin.usd;

    document.getElementById("ethereum").innerHTML =
      "$" + data.ethereum.usd;

  } catch (error) {
    console.log(error);
  }
}

// first load
getCryptoPrice();

// update every 10 seconds
setInterval(getCryptoPrice, 10000);