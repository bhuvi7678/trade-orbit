// =========================
// Trade Orbit V3
// =========================

let oldPrices = {};

const coinIds = [
  "bitcoin",
  "ethereum",
  "binancecoin",
  "solana"
];

function formatMarketCap(value) {
  if (value >= 1e12) {
    return "$" + (value / 1e12).toFixed(2) + " T";
  }
  if (value >= 1e9) {
    return "$" + (value / 1e9).toFixed(2) + " B";
  }
  if (value >= 1e6) {
    return "$" + (value / 1e6).toFixed(2) + " M";
  }
  return "$" + value.toLocaleString();
}

function updatePrice(id, price) {

  const element = document.getElementById(id);

  let arrow = "";

  if (oldPrices[id] !== undefined) {

    if (price > oldPrices[id]) {
      arrow = " ↑";
      element.className = "price price-up";
    } else if (price < oldPrices[id]) {
      arrow = " ↓";
      element.className = "price price-down";
    } else {
      element.className = "price";
    }

  } else {
    element.className = "price";
  }

  element.innerHTML = "$" + price.toLocaleString() + arrow;

  oldPrices[id] = price;
}

function updateChange(id, change) {

  const element = document.getElementById(id);

  if (change >= 0) {
    element.className = "change positive";
    element.innerHTML = "24H : +" + change.toFixed(2) + "%";
  } else {
    element.className = "change negative";
    element.innerHTML = "24H : " + change.toFixed(2) + "%";
  }

}

function fetchPrices() {

  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
      coinIds.join(",")
  )
    .then((response) => response.json())
    .then((data) => {

      data.forEach((coin) => {

        let id = coin.id;

        if (id === "binancecoin") {
          id = "bnb";
        }

        updatePrice(id, coin.current_price);

        updateChange(id + "-change", coin.price_change_percentage_24h);

        document.getElementById(id + "-logo").src = coin.image;

        document.getElementById(id + "-high").innerHTML =
          "📈 High : $" + coin.high_24h.toLocaleString();

        document.getElementById(id + "-low").innerHTML =
          "📉 Low : $" + coin.low_24h.toLocaleString();

        document.getElementById(id + "-marketcap").innerHTML =
          "💰 Market Cap : " +
          formatMarketCap(coin.market_cap);

        document.getElementById(id + "-rank").innerHTML =
          "🏆 Rank : #" + coin.market_cap_rank;
        updateSparkline(id, coin.sparkline_in_7d.price);

      });

      document.getElementById("update-time").innerHTML =
        "🕒 Last Updated : " +
        new Date().toLocaleTimeString();

    })
    .catch((error) => {
      console.log(error);
    });

}

fetchPrices();

setInterval(fetchPrices, 5000);

// =========================
// Search
// =========================

const search = document.getElementById("search");

search.addEventListener("keyup", function () {

  const value = this.value.toLowerCase();

  const cards = document.querySelectorAll(".coin-card");

  cards.forEach((card) => {

    const name = card.querySelector("h2").innerText.toLowerCase();

    if (name.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});
// =========================
// Sparkline Chart
// =========================

const sparkCharts = {};

function updateSparkline(id, prices) {

  const canvas = document.getElementById(id + "-chart");

  if (!canvas) return;

  if (!sparkCharts[id]) {

    sparkCharts[id] = new Chart(canvas, {
      type: "line",
      data: {
        labels: prices.map(() => ""),
        datasets: [{
          data: prices,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
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

  } else {

    sparkCharts[id].data.labels = prices.map(() => "");
    sparkCharts[id].data.datasets[0].data = prices;
    sparkCharts[id].update();

  }

}
