import React, { useEffect, useState } from 'react';
import { ExchangeRateStats, Location } from './types';
import { locations } from './data/locations';
import { fetchExchangeRates } from './utils/exchangeRates';
import { LocationSelector } from './components/LocationSelector';
import { PriceMetrics } from './components/PriceMetrics';
import { PriceComparison } from './components/PriceComparison';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExchangeRates().then((rates) => {
      setExchangeRates(rates);
      setLoading(false);
    });
  }, []);

  if (loading || !exchangeRates) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading exchange rates...</div>
      </div>
    );
  }

  const serverRates = selectedLocation.servers.map(server => ({
    name: server.name,
    rate: server.priceUSD / server.priceEUR
  }));

  const averageHetznerRate = serverRates.reduce(
    (sum, server) => sum + server.rate,
    0
  ) / serverRates.length;

  const averageOvercharge = selectedLocation.servers.reduce(
    (sum, server) => {
      const marketPrice = server.priceEUR * exchangeRates.current;
      const overcharge = (server.priceUSD / marketPrice) - 1;
      return sum + (overcharge * 100);
    },
    0
  ) / selectedLocation.servers.length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hetzner Cloud Pricing Analysis
          </h1>
          <p className="text-gray-600">
            Compare Hetzner's EUR and USD pricing across different locations and analyze the effective
            exchange rates.
          </p>
        </div>

        <LocationSelector
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />

        <PriceMetrics
          exchangeRates={exchangeRates}
          averageHetznerRate={averageHetznerRate}
          averageOvercharge={averageOvercharge}
          serverRates={serverRates}
        />

        <PriceComparison
          servers={selectedLocation.servers}
          exchangeRates={exchangeRates}
        />
      </div>
    </div>
  );
}

export default App;