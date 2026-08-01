function fetchPrices() {
  fetch("YOUR_API_URL")
    .then(response => response.json())
    .then(data => {
      document.getElementById("bitcoin").innerHTML =
        "$" + data.bitcoin.usd;
    })
    .catch(error => console.log(error));
}

// Page load hote hi
fetchPrices();

// Har 10 second me update
setInterval(fetchPrices, 10000);