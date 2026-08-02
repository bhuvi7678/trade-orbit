// =========================
// Trade Orbit V6 - indicators.js
// =========================


// Calculate EMA

function calculateEMA(data, period){

    let ema = [];

    let multiplier = 2 / (period + 1);


    let previousEMA = data[0].close;


    data.forEach((candle, index)=>{


        if(index === 0){

            ema.push({
                time:candle.time,
                value:previousEMA
            });

        }
        else{

            let currentEMA =
            (candle.close - previousEMA) * multiplier
            + previousEMA;


            previousEMA = currentEMA;


            ema.push({

                time:candle.time,

                value:currentEMA

            });

        }


    });


    return ema;

}


// Add EMA Lines

function addEMA(chart, candleData){

    console.log("EMA Function Running", candleData.length);
        


    const ema9 =
    chart.addLineSeries({
        lineWidth:2
    });


    const ema20 =
    chart.addLineSeries({
        lineWidth:2
    });


    const ema200 =
    chart.addLineSeries({
        lineWidth:2
    });



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
