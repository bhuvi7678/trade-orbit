// =========================
// Trade Orbit V4 - app.js
// =========================


// Website Load

document.addEventListener("DOMContentLoaded", function(){


    // First API Load

    if(typeof fetchCryptoData === "function"){

        fetchCryptoData();

    }


    // Search Start

    if(typeof setupSearch === "function"){

        setupSearch();

    }


});
