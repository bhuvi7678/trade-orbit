async function loadCrypto() {

    try {

        let response = await fetch(
            "https://api.coincap.io/v2/assets?ids=bitcoin,ethereum"
        );

        let data = await response.json();

        let bitcoin = data.data[0];
        let ethereum = data.data[1];


        document.getElementById("bitcoin").innerHTML =
        "₿ Bitcoin: $" + Number(bitcoin.priceUsd).toFixed(2);


        document.getElementById("ethereum").innerHTML =
        "Ξ Ethereum: $" + Number(ethereum.priceUsd).toFixed(2);


    } catch(error) {

        document.getElementById("bitcoin").innerHTML =
        "Bitcoin Error";

        document.getElementById("ethereum").innerHTML =
        "Ethereum Error";

    }

}


loadCrypto();

setInterval(loadCrypto, 30000);