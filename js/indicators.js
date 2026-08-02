// =========================
// Trade Orbit - indicators.js
// =========================

function addEMA(chart, candleData){

    console.log("EMA START", candleData);


    let emaLine = chart.addSeries(
        LightweightCharts.LineSeries,
        {
            lineWidth: 2
        }
    );


    let emaData = candleData.map((candle)=>{

        return {
            time: candle.time,
            value: candle.close
        };

    });


    console.log("EMA DATA", emaData);


    emaLine.setData(emaData);

}
