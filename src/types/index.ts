export interface ServerPrice {
  name: string;
  vcpu: number;
  ram: number;
  disk: number;
  priceEUR: number;
  priceUSD: number;
}

export interface Location {
  id: string;
  name: string;
  servers: ServerPrice[];
}

export interface ExchangeRate {
  date: string;
  rate: number;
}

export interface ExchangeRateStats {
  current: number;
  high: number;
  low: number;
  average: number;
  rates: ExchangeRate[];
}

export type ComparisonRate = 'market' | 'low' | 'average' | 'high';

export interface HighlightPoint {
  type: 'low' | 'high' | 'average' | null;
  value: number;
}