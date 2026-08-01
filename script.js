async function loadCrypto() {
    try {

        const response = await fetch(
            "https://api.coincap.io/v2/assets?ids=bitcoin,ethereum"
        );

        const result = await response.json();

        const bitcoin = result.data[0];
        const ethereum = result.data[1];


        document.getElementById("bitcoin").innerHTML =
        "₿ Bitcoin: $" + Number(bitcoin.priceUsd).toFixed(2);


        document.getElementById("ethereum").innerHTML =
        "Ξ Ethereum: $" + Number(ethereum.priceUsd).toFixed(2);


    } catch(error) {

        document.getElementById("bitcoin").innerHTML =
        "Bitcoin API Error";

        document.getElementById("ethereum").innerHTML =
        "Ethereum API Error";

    }
}


loadCrypto();

setInterval(loadCrypto, 30000);