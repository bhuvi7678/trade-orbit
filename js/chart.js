// =========================
// Trade Orbit V6 - chart.js
// =========================

// Sparkline Charts
const sparklineCharts = {};


// =========================
// Sparkline Chart
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
                borderColor:
                    prices[prices.length - 1] >= prices[0]
                    ? "#22c55e"
                    : "#ef4444",

                borderWidth:2,
                pointRadius:0,
                tension:0.35
            }]
        },


        options:{
            responsive:true,
            maintainAspectRatio:false,

            plugins:{
                legend:{
                    display:false
                },

                tooltip:{
                    enabled:false
                }
            },

            scales:{
                x:{
                    display:false
                },

                y:{
                    display:false
                }
            }
        }

    });

}



// =========================
// TradingView Candlestick
// =========================

let candleChart = null;
let candleSeries = null;


function createCandlestickChart(data){


    const container =
    document.getElementById("candlestick-chart");


    if(!container) return;


    container.innerHTML = "";


    candleChart =
    LightweightCharts.createChart(container, {

        width: container.clientWidth,

        height:400,


        layout:{
            background:{
                color:"#0f172a"
            },

            textColor:"#ffffff"
        },


        grid:{
            vertLines:{
                color:"#1e293b"
            },

            horzLines:{
                color:"#1e293b"
            }
        }

    });



    candleSeries =
    candleChart.addCandlestickSeries();



    candleSeries.setData(data);



}
