async function getCryptoData() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );

        const data = await response.json();

        document.getElementById("bitcoin").innerHTML =
            "Bitcoin: $" + data.bitcoin.usd;

        document.getElementById("ethereum").innerHTML =
            "Ethereum: $" + data.ethereum.usd;

    } catch (error) {
        console.log(error);
        document.getElementById("bitcoin").innerHTML = "Bitcoin Error";
        document.getElementById("ethereum").innerHTML = "Ethereum Error";
    }
}

getCryptoData();