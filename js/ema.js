// =========================
// Trade Orbit V8 - ema.js
// =========================

function calculateEMA(data, period) {
    if (!Array.isArray(data) || data.length < period) return [];

    const multiplier = 2 / (period + 1);
    const result = [];

    let ema = 0;

    for (let i = 0; i < period; i++) {
        ema += Number(data[i].close);
    }

    ema /= period;

    result.push({
        time: data[period - 1].time,
        value: ema
    });

    for (let i = period; i < data.length; i++) {
        ema = ((Number(data[i].close) - ema) * multiplier) + ema;

        result.push({
            time: data[i].time,
            value: Number(ema.toFixed(2))
        });
    }

    return result;
}

function addEMA(chart, candleData) {

    if (!chart || !Array.isArray(candleData) || candleData.length < 10) {
        return;
    }

    if (!window.ema9Series) {
        window.ema9Series = chart.addLineSeries({
            color: "#3b82f6",
            lineWidth: 2
        });
    }

    if (!window.ema20Series) {
        window.ema20Series = chart.addLineSeries({
            color: "#f59e0b",
            lineWidth: 2
        });
    }

    if (!window.ema200Series) {
        window.ema200Series = chart.addLineSeries({
            color: "#a855f7",
            lineWidth: 2
        });
    }

    window.ema9Series.setData(calculateEMA(candleData, 9));
    window.ema20Series.setData(calculateEMA(candleData, 20));

    if (candleData.length >= 200) {
        window.ema200Series.setData(calculateEMA(candleData, 200));
    }
}

console.log("EMA Engine Ready");
