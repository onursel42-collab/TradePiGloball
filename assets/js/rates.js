// Live Rates Widget - TL, USD, Pi
// Updates every 15 seconds with free public APIs

(function() {
  'use strict';

  const RATE_UPDATE_INTERVAL = 15000; // 15 seconds
  let updateTimer;

  // Elements
  const rateTRY = document.getElementById('rateTRY');
  const rateUSD = document.getElementById('rateUSD');
  const ratePi = document.getElementById('ratePi');

  // Fetch USD/TRY rate from a free API
  async function fetchUSDTRY() {
    try {
      // Using a free forex API - Falls back gracefully if unavailable
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) throw new Error('API response not OK');
      
      const data = await response.json();
      const tryRate = data.rates?.TRY;
      
      if (tryRate) {
        return tryRate.toFixed(2);
      }
      return null;
    } catch (error) {
      // Fallback silently for production
      return null;
    }
  }

  // Fetch TL/USD (inverse of USD/TRY)
  async function fetchTRYUSD() {
    try {
      const usdTry = await fetchUSDTRY();
      if (usdTry) {
        const tryUsd = (1 / parseFloat(usdTry)).toFixed(4);
        return tryUsd;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // Update the rates in the UI
  async function updateRates() {
    // Update TL rate (1 USD = X TRY)
    const usdTryRate = await fetchUSDTRY();
    if (usdTryRate && rateTRY) {
      rateTRY.innerHTML = `TL: <strong>₺${usdTryRate}</strong>`;
    } else if (rateTRY) {
      rateTRY.innerHTML = `TL: <strong>—</strong>`;
    }

    // Update USD rate (1 TRY = X USD)
    const tryUsdRate = await fetchTRYUSD();
    if (tryUsdRate && rateUSD) {
      rateUSD.innerHTML = `USD: <strong>$${tryUsdRate}</strong>`;
    } else if (rateUSD) {
      rateUSD.innerHTML = `USD: <strong>—</strong>`;
    }

    // Pi Network rate - placeholder for now
    if (ratePi) {
      ratePi.innerHTML = `Pi: <strong>yakında</strong>`;
      // When Pi Network integration is ready, fetch from Pi API:
      // ratePi.innerHTML = `Pi: <strong>π ${piRate}</strong>`;
    }
  }

  // Initialize and set up auto-refresh
  function init() {
    if (!rateTRY && !rateUSD && !ratePi) {
      // Widget not present on this page
      return;
    }

    // Initial update
    updateRates();

    // Set up periodic updates
    updateTimer = setInterval(updateRates, RATE_UPDATE_INTERVAL);
  }

  // Cleanup on page unload
  function cleanup() {
    if (updateTimer) {
      clearInterval(updateTimer);
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
})();
