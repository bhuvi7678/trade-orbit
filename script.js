async function getCryptoData() {
    try {
        let response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );

        let data = await response.json();

        document.getElementById("bitcoin").innerHTML =
        "Bitcoin: $" + data.bitcoin.usd;

        document.getElementById("ethereum").innerHTML =
        "Ethereum: $" + data.ethereum.usd;

    } catch(error) {
        console.log(error);
    }
}

getCryptoData();