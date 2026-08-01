async function loadPrices() {
    try {
        const response = await fetch("https://api.coincap.io/v2/assets?ids=bitcoin,ethereum");
        const result = await response.json();

        document.getElementById("btc-price").innerText =
            "$" + Number(result.data[0].priceUsd).toFixed(2);

        document.getElementById("eth-price").innerText =
            "$" + Number(result.data[1].priceUsd).toFixed(2);

    } catch (error) {
        console.log(error);
    }
}

async function searchCoin() {

    let coin = document.getElementById("coin-input").value.toLowerCase().trim();

    if (coin === "") {
        alert("Please enter a coin name");
        return;
    }

    try {

        const response = await fetch("https://api.coincap.io/v2/assets/" + coin);
        const result = await response.json();

        document.getElementById("coin-name").innerText = result.data.name;
        document.getElementById("coin-price").innerText =
            "$" + Number(result.data.priceUsd).toFixed(2);

    } catch (error) {

        document.getElementById("coin-name").innerText = "Coin Not Found";
        document.getElementById("coin-price").innerText = "Try: bitcoin, ethereum, solana";

    }
}

loadPrices();
setInterval(loadPrices, 30000);