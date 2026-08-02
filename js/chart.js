// =========================
// Trade Orbit V5 - chart.js
// =========================

const sparklineCharts = {};

// Create Sparkline Chart
function createSparkline(canvasId, prices) {

    const canvas = document.getElementById(canvasId);

    if (!canvas || !prices || prices.length === 0) return;

    // Destroy old chart
    if (sparklineCharts[canvasId]) {
        sparklineCharts[canvasId].destroy();
    }

    const isPositive = prices[prices.length - 1] >= prices[0];

    sparklineCharts[canvasId] = new Chart(canvas, {
        type: "line",
        data: {
            labels: prices.map((_, i) => i),
            datasets: [{
                data: prices,
                borderColor: isPositive ? "#22c55e" : "#ef4444",
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.35,
                fill: false
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
            },
            elements: {
                line: {
                    borderJoinStyle: "round"
                }
            }
        }
    });

}
