const coins = ["bitcoin", "ethereum"];

async function getCryptoData() {
    for (let coin of coins) {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
            );

            const data = await response.json();

            document.getElementById(coin).innerHTML =
                `${coin.toUpperCase()}: $${data[coin].usd}`;

        } catch (error) {
            document.getElementById(coin).innerHTML =
                `${coin.toUpperCase()} Error`;
            console.log(error);
        }
    }
}

getCryptoData();