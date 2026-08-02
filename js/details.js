async function loadCandlestickData(id){

    try{

        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=7`
        );


        const ohlc = await response.json();


        console.log("OHLC DATA:", ohlc);


        if(!Array.isArray(ohlc) || ohlc.length === 0){

            console.log("No OHLC data found");
            return;

        }


        const candleData = ohlc.map(item => ({

            time: Math.floor(item[0] / 1000),

            open: item[1],

            high: item[2],

            low: item[3],

            close: item[4]

        }));


        console.log("CANDLE DATA:", candleData);


        createCandlestickChart(candleData);


    }

    catch(error){

        console.log("Chart Error:", error);

    }

}
