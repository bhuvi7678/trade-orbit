// =========================
// Trade Orbit V7 - chart.js
// Part 1/4
// =========================

console.log("CHART.JS LOADED");

// Sparkline Charts
const sparklineCharts = {};

// Main Chart
let candleChart = null;
let candleSeries = null;

// EMA Series
let ema9Series = null;
let ema20Series = null;
let ema200Series = null;

// Current Candle Cache
let currentCandleData = [];

// =========================
// Sparkline
// =========================

function createSparkline(canvasId, prices) {

    const canvas = document.getElementById(canvasId);

    if (!canvas || !prices || prices.length === 0) return;

    if (sparklineCharts[canvasId]) {
        sparklineCharts[canvasId].destroy();
    }

    sparklineCharts[canvasId] = new Chart(canvas, {

        type: "line",

        data: {

            labels: prices.map((_, i) => i),

            datasets: [{
                data: prices,
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.35,

                borderColor:
                    prices[prices.length - 1] >= prices[0]
                        ? "#22c55e"
                        : "#ef4444"

            }]

        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },

            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            }

        }

    });

}
// =========================
// Part 2/4
// =========================

candleSeries.setData(currentCandleData);

// Draw EMA
addEMA(candleChart, currentCandleData);

// Draw RSI
addRSI(currentCandleData);
    const container =
        document.getElementById("candlestick-chart");

    if (!container) return;

    currentCandleData = [...data];

    // Remove old chart
    if (candleChart) {
        candleChart.remove();
        candleChart = null;
    }

    candleChart = LightweightCharts.createChart(container, {

        width: container.clientWidth,
        height: 420,

        layout: {

            background: {
                color: "#0f172a"
            },

            textColor: "#ffffff"

        },

        grid: {

            vertLines: {
                color: "#1e293b"
            },

            horzLines: {
                color: "#1e293b"
            }

        },

        rightPriceScale: {
            borderColor: "#334155"
        },

        timeScale: {
            borderColor: "#334155",
            timeVisible: true,
            secondsVisible: false
        }

    });

    // Candlestick Series
    candleSeries = candleChart.addCandlestickSeries({

        upColor: "#22c55e",
        downColor: "#ef4444",

        borderUpColor: "#22c55e",
        borderDownColor: "#ef4444",

        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444"

    });

    candleSeries.setData(currentCandleData);

    // EMA Lines
    ema9Series = candleChart.addLineSeries({
        color: "#3b82f6",
        lineWidth: 2
    });

    ema20Series = candleChart.addLineSeries({
        color: "#f59e0b",
        lineWidth: 2
    });

    ema200Series = candleChart.addLineSeries({
        color: "#a855f7",
        lineWidth: 2
    });

    // Draw EMA
    addEMA(candleChart, currentCandleData);

    // Fit Chart
    candleChart.timeScale().fitContent();

    // Responsive
    window.addEventListener("resize", () => {

        if (!candleChart) return;

        candleChart.applyOptions({
            width: container.clientWidth
        });

    });

}
// =========================
// Part 3/4
// =========================

// Replace chart data without recreating chart
function updateCandlestickChart(data) {

    if (!candleSeries) return;

    currentCandleData = [...data];

    candleSeries.setData(currentCandleData);

    // Refresh EMA
    addEMA(candleChart, currentCandleData);

}

// Update only latest candle (for live WebSocket)
function updateLatestCandle(candle) {

    if (!candleSeries) return;

    candleSeries.update(candle);

    // Update local cache
    const last = currentCandleData[currentCandleData.length - 1];

    if (last && last.time === candle.time) {

        currentCandleData[currentCandleData.length - 1] = candle;

    } else {

        currentCandleData.push(candle);

    }

    // Keep only recent candles
    if (currentCandleData.length > 500) {
        currentCandleData.shift();
    }

    // Update EMA
    addEMA(candleChart, currentCandleData);

}

// Reset chart
function resetChart() {

    currentCandleData = [];

    if (candleChart) {
        candleChart.remove();
        candleChart = null;
    }

    candleSeries = null;
    ema9Series = null;
    ema20Series = null;
    ema200Series = null;

}
// =========================
// Part 4/4
// =========================

// Destroy chart safely
function destroyCandlestickChart() {

    if (candleChart) {
        candleChart.remove();
        candleChart = null;
    }

    candleSeries = null;
    ema9Series = null;
    ema20Series = null;
    ema200Series = null;

    currentCandleData = [];

}

// Check if chart exists
function hasChart() {

    return candleChart !== null;

}

// Cleanup on page unload
window.addEventListener("beforeunload", () => {

    destroyCandlestickChart();

});

console.log("Trade Orbit Chart Engine Ready");
