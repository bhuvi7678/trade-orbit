// =========================
// Trade Orbit V6 - indicators.js
// =========================

function calculateEMA(data, period){

    let ema = [];

    let multiplier = 2 / (period + 1);

    let previousEMA = data[0].close;


    data.forEach((candle, index)=>{

        if(index === 0){

            previousEMA = candle.close;

        } else {

            previousEMA =
            (candle.close - previousEMA) * multiplier
            + previousEMA;

        }


        ema.push({

            time: candle.time,
            value: previousEMA

        });


    });


    return ema;

}



function addEMA(chart, candleData){


    const ema9 = chart.addSeries(
        LightweightCharts.LineSeries,
        {
            lineWidth:2,
        }
    );


    const ema20 = chart.addSeries(
        LightweightCharts.LineSeries,
        {
            lineWidth:2,
        }
    );


    const ema200 = chart.addSeries(
        LightweightCharts.LineSeries,
        {
            lineWidth:2,
        }
    );


    ema9.setData(
        calculateEMA(candleData,9)
    );


    ema20.setData(
        calculateEMA(candleData,20)
    );


    ema200.setData(
        calculateEMA(candleData,200)
    );


}
