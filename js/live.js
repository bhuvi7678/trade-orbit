// =========================
// Trade Orbit V8 - live.js
// =========================

let liveRefreshInterval = null;

// Starts automatic market refresh
function startLiveUpdates(interval = 30000) {

    stopLiveUpdates();

    liveRefreshInterval = setInterval(async () => {

        try {

            if (typeof fetchCryptoData === "function") {
                await fetchCryptoData();
            }

            console.log(
                "[LIVE] Updated:",
                new Date().toLocaleTimeString()
            );

        } catch (err) {
            console.error("[LIVE] Update Error:", err);
        }

    }, interval);

}

// Stops automatic refresh
function stopLiveUpdates() {

    if (liveRefreshInterval) {
        clearInterval(liveRefreshInterval);
        liveRefreshInterval = null;
    }

}

// Restart with new interval
function restartLiveUpdates(interval = 30000) {

    stopLiveUpdates();
    startLiveUpdates(interval);

}

// Auto start after page load
document.addEventListener("DOMContentLoaded", () => {

    startLiveUpdates();

});

// Cleanup
window.addEventListener("beforeunload", () => {

    stopLiveUpdates();

});

console.log("Live Engine Ready");
