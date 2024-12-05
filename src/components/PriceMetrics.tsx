import React, { useState } from 'react';
import { TrendingUp, DollarSign, Euro, BarChart2 } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, ReferenceLine, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { ExchangeRateStats, ComparisonRate, HighlightPoint } from '../types';
import { RateSparkline } from './RateSparkline';

interface Props {
  exchangeRates: ExchangeRateStats;
  averageHetznerRate: number;
  averageOvercharge: number;
  serverRates: { name: string; rate: number }[];
}

export function PriceMetrics({ exchangeRates, averageHetznerRate, averageOvercharge, serverRates }: Props) {
  const [comparisonRate, setComparisonRate] = useState<ComparisonRate>('market');
  const [highlightPoint, setHighlightPoint] = useState<HighlightPoint>({ type: null, value: 0 });

  const getComparisonRate = (type: ComparisonRate) => {
    switch (type) {
      case 'market': return exchangeRates.current;
      case 'low': return exchangeRates.low;
      case 'average': return exchangeRates.average;
      case 'high': return exchangeRates.high;
    }
  };

  const currentRate = getComparisonRate(comparisonRate);
  const overchargeData = serverRates.map(s => ({
    name: s.name,
    value: ((s.rate / currentRate) - 1) * 100,
    isPositive: ((s.rate / currentRate) - 1) > 0
  }));

  const metrics = [
    {
      title: (
        <div className="flex items-center space-x-1">
          <span>Overcharge vs</span>
          <select
            className="text-sm bg-transparent border-none focus:ring-0 cursor-pointer"
            value={comparisonRate}
            onChange={(e) => setComparisonRate(e.target.value as ComparisonRate)}
          >
            <option value="market">Market</option>
            <option value="low">2Y Low</option>
            <option value="average">2Y Average</option>
            <option value="high">2Y High</option>
          </select>
        </div>
      ),
      value: (averageHetznerRate / currentRate - 1) * 100,
      valueFormatter: (value: number) => `${value.toFixed(2)}%`,
      icon: TrendingUp,
      color: averageOvercharge > 0 ? 'text-red-600' : 'text-green-600',
      data: overchargeData
    },
    {
      title: 'Average Hetzner Rate',
      value: averageHetznerRate,
      valueFormatter: (value: number) => value.toFixed(4),
      icon: DollarSign,
      color: 'text-blue-600',
      data: serverRates.map(s => ({ name: s.name, value: s.rate }))
    },
    {
      title: 'Current Market Rate',
      value: exchangeRates.current.toFixed(4),
      icon: Euro,
      color: 'text-green-600',
      sparkline: true
    },
    {
      title: 'Market Rate Stats (2 Years)',
      value: (
        <div className="flex flex-col space-y-2">
          {[
            { label: 'High', value: exchangeRates.high, type: 'high' },
            { label: 'Average', value: exchangeRates.average, type: 'average' },
            { label: 'Low', value: exchangeRates.low, type: 'low' }
          ].map(({ label, value, type }) => (
            <button
              key={type}
              onClick={() => setHighlightPoint({ type, value })}
              className={`group flex items-center space-x-2 hover:opacity-75 ${
                highlightPoint.type === type ? 'opacity-80' : 'opacity-100'
              }`}
            >
              <span className={`text-lg`}>
                {value.toFixed(4)}
              </span>
                <span className="text-xs text-gray-500 w-16 font-normal">{label}</span>
            </button>
          ))}
        </div>
      ),
      icon: BarChart2,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col space-y-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              {metric.title}
            </h3>
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
          </div>
          <div className={`text-2xl font-bold ${metric.color}`}>
            {metric.valueFormatter ? metric.valueFormatter(metric.value) : metric.value}
          </div>
          
          {metric.sparkline && (
            <RateSparkline
              rates={exchangeRates.rates}
              average={exchangeRates.average}
              highlightPoint={highlightPoint}
            />
          )}
          
          {metric.data && (
            <div className="h-16 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metric.data}>
                  <defs>
                    <linearGradient id="colorBarPositive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#DC2626" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity={0.3} />
                    </linearGradient>
                    <linearGradient id="colorBarNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.3} />
                    </linearGradient>
                    <linearGradient id="colorBarBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip
                    formatter={(value: number) => [
                      value.toFixed(2),
                      index === 0 ? 'Overcharge %' : 'Rate'
                    ]}
                  />
                  <ReferenceLine 
                    y={metric.value}
                    stroke="#666" 
                    strokeDasharray="3 3" 
                  />
                  <Bar
                    dataKey="value"
                    fill={index === 0 ? 'url(#colorBarPositive)' : 'url(#colorBarBlue)'}
                    radius={[2, 2, 0, 0]}
                  >
                    {index === 0 && metric.data?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isPositive ? 'url(#colorBarPositive)' : 'url(#colorBarNegative)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}