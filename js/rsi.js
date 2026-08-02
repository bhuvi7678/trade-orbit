// =========================
// Trade Orbit V7 - rsi.js
// =========================

console.log("RSI.JS LOADED");

let rsiSeries = null;


// =========================
// Calculate RSI
// =========================

function calculateRSI(candleData, period = 14) {

    if (!candleData || candleData.length <= period) {
        return [];
    }


    let gains = [];
    let losses = [];


    for (let i = 1; i < candleData.length; i++) {

        const change =
            candleData[i].close -
            candleData[i - 1].close;


        if (change >= 0) {

            gains.push(change);
            losses.push(0);

        } else {

            gains.push(0);
            losses.push(Math.abs(change));

        }

    }


    let avgGain =
        gains.slice(0, period)
        .reduce((a,b)=>a+b,0) / period;


    let avgLoss =
        losses.slice(0, period)
        .reduce((a,b)=>a+b,0) / period;


    let rsiData = [];


    for (let i = period; i < gains.length; i++) {


        avgGain =
            ((avgGain * (period - 1)) + gains[i])
            / period;


        avgLoss =
            ((avgLoss * (period - 1)) + losses[i])
            / period;



        let rs =
            avgLoss === 0
            ? 100
            : avgGain / avgLoss;



        let rsi =
            100 - (100 / (1 + rs));



        rsiData.push({

            time: candleData[i + 1].time,

            value: rsi

        });

    }


    return rsiData;

}



// =========================
// Add RSI Chart
// =========================

function addRSI(candleData) {


    const rsiData =
        calculateRSI(candleData,14);



    if (!rsiData.length) {
        return;
    }



    if (!rsiSeries && candleChart) {


        rsiSeries =
            candleChart.addLineSeries({

                lineWidth:2

            });

    }



    if (rsiSeries) {

        rsiSeries.setData(rsiData);

    }


}



function getRSIStatus(value){


    if(value >= 70){

        return "Overbought";

    }


    if(value <= 30){

        return "Oversold";

    }


    return "Neutral";

}



console.log("RSI Engine Ready");
