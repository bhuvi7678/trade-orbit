// =========================
// Trade Orbit V8 - ema.js
// =========================

let ema9Series = null;
let ema20Series = null;
let ema50Series = null;

// =========================
// Calculate EMA
// =========================

function calculateEMA(data, period) {

    if (!data || data.length < period) return [];

    const multiplier = 2 / (period + 1);

    let ema = [];

    let sum = 0;

    for (let i = 0; i < period; i++) {
        sum += data[i].close;
    }

    let previousEMA = sum / period;

    ema.push({
        time: data[period - 1].time,
        value: previousEMA
    });

    for (let i = period; i < data.length; i++) {

        previousEMA =
            ((data[i].close - previousEMA) * multiplier) + previousEMA;

        ema.push({
            time: data[i].time,
            value: Number(previousEMA.toFixed(2))
        });

    }

    return ema;

}

// =========================
// Draw EMA
// =========================

function addEMA(chart, candles) {

    if (!chart || !candles) return;

    // Remove old EMA

    if (ema9Series) {
        chart.removeSeries(ema9Series);
        ema9Series = null;
    }

    if (ema20Series) {
        chart.removeSeries(ema20Series);
        ema20Series = null;
    }

    if (ema50Series) {
        chart.removeSeries(ema50Series);
        ema50Series = null;
    }

    // Create EMA Lines

    ema9Series = chart.addLineSeries({

        color: "#FFD700",

        lineWidth: 2,

        title: "EMA 9"

    });

    ema20Series = chart.addLineSeries({

        color: "#00BFFF",

        lineWidth: 2,

        title: "EMA 20"

    });

    ema50Series = chart.addLineSeries({

        color: "#FF00FF",

        lineWidth: 2,

        title: "EMA 50"

    });

    // Calculate

    const ema9 = calculateEMA(candles, 9);

    const ema20 = calculateEMA(candles, 20);

    const ema50 = calculateEMA(candles, 50);

    // Draw

    ema9Series.setData(ema9);

    ema20Series.setData(ema20);

    ema50Series.setData(ema50);

}
