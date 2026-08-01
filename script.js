async function loadPrices() {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets?ids=bitcoin,ethereum");
    const data = await response.json();

    const btc = data.data[0];
    const eth = data.data[1];

    document.getElementById("btc-price").innerText =
      "$" + Number(btc.priceUsd).toFixed(2);

    document.getElementById("eth-price").innerText =
      "$" + Number(eth.priceUsd).toFixed(2);

  } catch (error) {
    document.getElementById("btc-price").innerText = "Error";
    document.getElementById("eth-price").innerText = "Error";
    console.error(error);
  }
}

loadPrices();
setInterval(loadPrices, 30000);