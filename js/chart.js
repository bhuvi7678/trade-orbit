// Trade Orbit V8 chart.js
alert("NEW chart.js Loaded");
const sparklineCharts={};
let candleChart=null,candleSeries=null,currentCandleData=[];

function createSparkline(canvasId,prices){
 const c=document.getElementById(canvasId);
 if(!c||!prices||!window.Chart)return;
 if(sparklineCharts[canvasId]) sparklineCharts[canvasId].destroy();
 sparklineCharts[canvasId]=new Chart(c,{type:'line',data:{labels:prices.map((_,i)=>i),datasets:[{data:prices,borderWidth:2,pointRadius:0,tension:.35,borderColor:prices.at(-1)>=prices[0]?'#22c55e':'#ef4444'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{x:{display:false},y:{display:false}}}});
}
function createCandlestickChart(data){
 const container=document.getElementById('candlestick-chart');
 if(!container||!window.LightweightCharts) return;
 currentCandleData=[...(data||[])];
 if(candleChart) candleChart.remove();
 candleChart=LightweightCharts.createChart(container,{width:container.clientWidth,height:420});
 candleSeries=candleChart.addCandlestickSeries();
 candleSeries.setData(currentCandleData);
 if(typeof addEMA==='function') addEMA(candleChart,currentCandleData);
 if(typeof addRSI==='function') addRSI(currentCandleData);
 candleChart.timeScale().fitContent();
}
function updateCandlestickChart(data){
 currentCandleData=[...(data||[])];
 if(candleSeries) candleSeries.setData(currentCandleData);
 if(typeof addEMA==='function'&&candleChart) addEMA(candleChart,currentCandleData);
}
function updateLatestCandle(c){ if(candleSeries) candleSeries.update(c);}
function destroyCandlestickChart(){if(candleChart){candleChart.remove();candleChart=null;} candleSeries=null;currentCandleData=[];}
// =========================
// Load Candlestick Data
// =========================

async function loadCandlestickData(coinId) {

    try {

        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=1`
        );

        const data = await response.json();

        const candles = data.map(c => ({
            time: Math.floor(c[0] / 1000),
            open: c[1],
            high: c[2],
            low: c[3],
            close: c[4]
        }));

        createCandlestickChart(candles);

    } catch (err) {

        console.error("Chart Error:", err);

    }

}
