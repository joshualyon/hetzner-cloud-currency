import { ExchangeRateStats, ExchangeRate } from '../types';

const FRANKFURTER_API = 'https://api.frankfurter.app';
const STORAGE_KEY = 'exchange_rates_data';
const UPDATE_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchExchangeRates(): Promise<ExchangeRateStats> {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const data = JSON.parse(stored);
    if (Date.now() - data.timestamp < UPDATE_INTERVAL) {
      return data.rates;
    }
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);

  const response = await fetch(
    `${FRANKFURTER_API}/${startDate.toISOString().split('T')[0]}..${
      endDate.toISOString().split('T')[0]
    }?from=EUR&to=USD`
  );
  const data = await response.json();

  const rates: ExchangeRate[] = Object.entries(data.rates).map(([date, rate]: [string, any]) => ({
    date,
    rate: rate.USD
  }));

  const current = rates[rates.length - 1].rate;
  const sortedRates = [...rates].sort((a, b) => a.rate - b.rate);
  const high = sortedRates[sortedRates.length - 1].rate;
  const low = sortedRates[0].rate;
  const average = rates.reduce((sum, rate) => sum + rate.rate, 0) / rates.length;

  const stats: ExchangeRateStats = {
    current,
    high,
    low,
    average,
    rates
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      timestamp: Date.now(),
      rates: stats
    })
  );

  return stats;
}