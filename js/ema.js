// =========================
// Trade Orbit V7 - ema.js
// =========================

console.log("EMA.JS LOADED");


// Calculate EMA
function calculateEMA(data, period) {

    if (!data || data.length < period) {
        return [];
    }


    let ema = [];

    const multiplier = 2 / (period + 1);


    // First EMA = SMA
    let sma = 0;

    for (let i = 0; i < period; i++) {

        sma += data[i].close;

    }

    sma = sma / period;


    ema.push({
        time: data[period - 1].time,
        value: sma
    });


    // Remaining EMA
    for (let i = period; i < data.length; i++) {

        const value =
            (data[i].close - ema[ema.length - 1].value)
            * multiplier
            +
            ema[ema.length - 1].value;


        ema.push({

            time: data[i].time,
            value: value

        });

    }


    return ema;

}



// Add EMA Lines To Chart
function addEMA(chart, candleData) {

    if (!chart || !candleData || candleData.length === 0) {
        return;
    }


    const ema9 =
        calculateEMA(candleData, 9);


    const ema20 =
        calculateEMA(candleData, 20);


    const ema200 =
        calculateEMA(candleData, 200);



    if (typeof ema9Series !== "undefined" && ema9Series) {

        ema9Series.setData(ema9);

    }


    if (typeof ema20Series !== "undefined" && ema20Series) {

        ema20Series.setData(ema20);

    }


    if (typeof ema200Series !== "undefined" && ema200Series) {

        ema200Series.setData(ema200);

    }

}


console.log("EMA Engine Ready");
