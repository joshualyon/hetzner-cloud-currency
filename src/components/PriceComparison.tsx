import React from 'react';
import { ServerPrice, ExchangeRateStats } from '../types';

interface Props {
  servers: ServerPrice[];
  exchangeRates: ExchangeRateStats;
}

export function PriceComparison({ servers, exchangeRates }: Props) {
  const calculateOvercharge = (eurPrice: number, usdPrice: number, rate: number) => {
    const marketUSD = eurPrice * rate;
    const overcharge = ((usdPrice / marketUSD) - 1) * 100;
    return overcharge;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-left">Server</th>
            <th className="py-3 px-6 text-right">EUR Price</th>
            <th className="py-3 px-6 text-right">USD Price</th>
            <th className="py-3 px-6 text-right">Market Rate USD</th>
            <th className="py-3 px-6 text-right">2Y High USD</th>
            <th className="py-3 px-6 text-right">2Y Low USD</th>
            <th className="py-3 px-6 text-right">2Y Avg USD</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {servers.map((server) => {
            const marketUSD = server.priceEUR * exchangeRates.current;
            const highUSD = server.priceEUR * exchangeRates.high;
            const lowUSD = server.priceEUR * exchangeRates.low;
            const avgUSD = server.priceEUR * exchangeRates.average;

            const marketOvercharge = calculateOvercharge(server.priceEUR, server.priceUSD, exchangeRates.current);
            const highOvercharge = calculateOvercharge(server.priceEUR, server.priceUSD, exchangeRates.high);
            const lowOvercharge = calculateOvercharge(server.priceEUR, server.priceUSD, exchangeRates.low);
            const avgOvercharge = calculateOvercharge(server.priceEUR, server.priceUSD, exchangeRates.average);

            return (
              <tr key={server.name} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{server.name}</div>
                  <div className="text-xs text-gray-500">
                    {server.vcpu} vCPU • {server.ram}GB RAM • {server.disk}GB Disk
                  </div>
                </td>
                <td className="py-3 px-6 text-right">€{server.priceEUR.toFixed(2)}</td>
                <td className="py-3 px-6 text-right">${server.priceUSD.toFixed(2)}</td>
                <td className="py-3 px-6">
                  <div className="text-right">${marketUSD.toFixed(2)}</div>
                  <div className={`text-xs text-right ${marketOvercharge > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {marketOvercharge > 0 ? '+' : ''}{marketOvercharge.toFixed(1)}%
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="text-right">${highUSD.toFixed(2)}</div>
                  <div className={`text-xs text-right ${highOvercharge > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {highOvercharge > 0 ? '+' : ''}{highOvercharge.toFixed(1)}%
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="text-right">${lowUSD.toFixed(2)}</div>
                  <div className={`text-xs text-right ${lowOvercharge > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {lowOvercharge > 0 ? '+' : ''}{lowOvercharge.toFixed(1)}%
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="text-right">${avgUSD.toFixed(2)}</div>
                  <div className={`text-xs text-right ${avgOvercharge > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {avgOvercharge > 0 ? '+' : ''}{avgOvercharge.toFixed(1)}%
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}