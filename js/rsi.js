// =========================
// Trade Orbit V8 - rsi.js
// =========================

let rsiSeries = null;

function calculateRSI(candleData, period = 14) {

    if (!Array.isArray(candleData) || candleData.length <= period) {
        return [];
    }

    const closes = candleData.map(c => Number(c.close));
    const output = [];

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
        const diff = closes[i] - closes[i - 1];
        if (diff >= 0) gains += diff;
        else losses += Math.abs(diff);
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;

    output.push({
        time: candleData[period].time,
        value: Number((100 - (100 / (1 + rs))).toFixed(2))
    });

    for (let i = period + 1; i < closes.length; i++) {
        const diff = closes[i] - closes[i - 1];
        const gain = diff > 0 ? diff : 0;
        const loss = diff < 0 ? Math.abs(diff) : 0;

        avgGain = ((avgGain * (period - 1)) + gain) / period;
        avgLoss = ((avgLoss * (period - 1)) + loss) / period;

        rs = avgLoss === 0 ? 100 : avgGain / avgLoss;

        output.push({
            time: candleData[i].time,
            value: Number((100 - (100 / (1 + rs))).toFixed(2))
        });
    }

    return output;
}

function addRSI(candleData) {

    if (!window.candleChart) return;
    if (!Array.isArray(candleData) || candleData.length < 15) return;

    if (!rsiSeries) {
        rsiSeries = window.candleChart.addLineSeries({
            color: "#14b8a6",
            lineWidth: 2,
            priceScaleId: "rsi"
        });

        window.candleChart.priceScale("rsi").applyOptions({
            scaleMargins: {
                top: 0.8,
                bottom: 0
            }
        });
    }

    rsiSeries.setData(calculateRSI(candleData));
}

console.log("RSI Engine Ready");
