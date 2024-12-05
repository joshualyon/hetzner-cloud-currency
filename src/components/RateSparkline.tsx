import React from 'react';
import { Area, AreaChart, ResponsiveContainer, ReferenceLine, Tooltip, XAxis, YAxis, Dot } from 'recharts';
import { format } from 'date-fns';
import { ExchangeRate, HighlightPoint } from '../types';

interface Props {
  rates: ExchangeRate[];
  average: number;
  highlightPoint: HighlightPoint;
}

export function RateSparkline({ rates, average, highlightPoint }: Props) {
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (highlightPoint.type && Math.abs(payload.rate - highlightPoint.value) < 0.0001) {
      return (
        <Dot
          key={payload.date}
          cx={cx}
          cy={cy}
          r={4}
          fill="#4B5563"
          stroke="#fff"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return (
    <div className="h-16">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rates}>
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM yyyy')}
            hide
          />
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <ReferenceLine 
            y={average} 
            stroke="#666" 
            strokeDasharray="3 3" 
            strokeOpacity={highlightPoint.type === 'average' ? 1 : 0.5}
            strokeWidth={highlightPoint.type === 'average' ? 2 : 1}
          />
          <Tooltip
            labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
            formatter={(value: number) => [value.toFixed(4), 'EUR/USD']}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorRate)"
            dot={renderDot}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}