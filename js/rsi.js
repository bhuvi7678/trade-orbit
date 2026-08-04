// =========================
// Trade Orbit V8 - rsi.js
// =========================

const RSI_PERIOD = 14;

// =========================
// Calculate RSI
// =========================

function calculateRSI(candles, period = RSI_PERIOD) {

    if (!candles || candles.length <= period) {
        return [];
    }

    const rsi = [];

    let gains = 0;
    let losses = 0;

    // Initial Average
    for (let i = 1; i <= period; i++) {

        const change = candles[i].close - candles[i - 1].close;

        if (change >= 0) {
            gains += change;
        } else {
            losses += Math.abs(change);
        }

    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;

    rsi.push({

        time: candles[period].time,

        value: Number((100 - (100 / (1 + rs))).toFixed(2))

    });

    // Remaining RSI
    for (let i = period + 1; i < candles.length; i++) {

        const change = candles[i].close - candles[i - 1].close;

        const gain = change > 0 ? change : 0;
        const loss = change < 0 ? Math.abs(change) : 0;

        avgGain =
            ((avgGain * (period - 1)) + gain) / period;

        avgLoss =
            ((avgLoss * (period - 1)) + loss) / period;

        rs = avgLoss === 0 ? 100 : avgGain / avgLoss;

        rsi.push({

            time: candles[i].time,

            value: Number((100 - (100 / (1 + rs))).toFixed(2))

        });

    }

    return rsi;

}

// =========================
// Add RSI
// =========================

function addRSI(candles) {

    const rsi = calculateRSI(candles);

    console.log("RSI:", rsi);

    return rsi;

}

// =========================
// Latest RSI
// =========================

function getLatestRSI(candles) {

    const rsi = calculateRSI(candles);

    if (!rsi.length) return null;

    return rsi[rsi.length - 1].value;

}

// =========================
// RSI Signal
// =========================

function getRSISignal(candles) {

    const value = getLatestRSI(candles);

    if (value === null) {

        return "WAIT";

    }

    if (value >= 70) {

        return "SELL";

    }

    if (value <= 30) {

        return "BUY";

    }

    return "HOLD";

}
