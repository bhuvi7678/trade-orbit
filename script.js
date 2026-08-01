const coins = ["bitcoin", "ethereum"];

async function getCryptoData() {

    for (let coin of coins) {

        try {

            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;

            const response = await fetch(url);

            const data = await response.json();

            console.log(data);

            document.getElementById(coin).innerHTML =
                `${coin.toUpperCase()}: $${data[coin].usd}`;

        } catch (error) {

            console.log("Error:", error);

            document.getElementById(coin).innerHTML =
                "API Error";
        }
    }
}

getCryptoData();