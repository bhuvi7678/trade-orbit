function addEMA(chart, candleData){

    console.log("EMA START", candleData.length);


    const emaLine = chart.addSeries(
        LightweightCharts.LineSeries,
        {
            lineWidth: 2
        }
    );


    const emaData = candleData.map(candle => {

        return {
            time: candle.time,
            value: candle.close
        };

    });


    console.log("EMA DATA", emaData);


    emaLine.setData(emaData);

}
