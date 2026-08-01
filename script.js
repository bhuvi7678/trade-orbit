const coins = ["bitcoin", "ethereum"];

async function getCryptoData() {

    for (let coin of coins) {

        const element = document.getElementById(coin);

        if (!element) {
            console.log("Missing ID:", coin);
            continue;
        }

        try {

            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
            );

            if (!response.ok) {
                throw new Error("API Error");
            }

            const data = await response.json();

            element.innerHTML = 
            `${coin.toUpperCase()}: $${data[coin].usd}`;

        } catch (error) {

            element.innerHTML = 
            `${coin.toUpperCase()} Data Not Available`;

            console.log(error);
        }
    }
}

getCryptoData();