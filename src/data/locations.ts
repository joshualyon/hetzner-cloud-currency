import { Location } from '../types';

export const locations: Location[] = [
  {
    id: 'fsn1',
    name: 'Falkenstein, Germany',
    servers: [
      { name: 'CPX11', vcpu: 2, ram: 2, disk: 40, priceEUR: 4.35, priceUSD: 5.09 },
      { name: 'CPX21', vcpu: 3, ram: 4, disk: 80, priceEUR: 7.55, priceUSD: 8.59 },
      { name: 'CPX31', vcpu: 4, ram: 8, disk: 160, priceEUR: 13.60, priceUSD: 15.59 },
      { name: 'CPX41', vcpu: 8, ram: 16, disk: 240, priceEUR: 25.20, priceUSD: 28.09 },
      { name: 'CPX51', vcpu: 16, ram: 32, disk: 360, priceEUR: 54.90, priceUSD: 61.09 }
    ]
  },
  {
    id: 'hel1',
    name: 'Helsinki, Finland',
    servers: [
      { name: 'CPX11', vcpu: 2, ram: 2, disk: 40, priceEUR: 4.35, priceUSD: 5.09 },
      { name: 'CPX21', vcpu: 3, ram: 4, disk: 80, priceEUR: 7.55, priceUSD: 8.59 },
      { name: 'CPX31', vcpu: 4, ram: 8, disk: 160, priceEUR: 13.60, priceUSD: 15.59 },
      { name: 'CPX41', vcpu: 8, ram: 16, disk: 240, priceEUR: 25.20, priceUSD: 28.09 },
      { name: 'CPX51', vcpu: 16, ram: 32, disk: 360, priceEUR: 54.90, priceUSD: 61.09 }
    ]
  },
  {
    id: 'ash',
    name: 'Ashburn, VA (US)',
    servers: [
      { name: 'CPX11', vcpu: 2, ram: 2, disk: 40, priceEUR: 4.99, priceUSD: 5.59 },
      { name: 'CPX21', vcpu: 3, ram: 4, disk: 80, priceEUR: 9.49, priceUSD: 10.59 },
      { name: 'CPX31', vcpu: 4, ram: 8, disk: 160, priceEUR: 16.49, priceUSD: 18.59 },
      { name: 'CPX41', vcpu: 8, ram: 16, disk: 240, priceEUR: 30.49, priceUSD: 34.09 },
      { name: 'CPX51', vcpu: 16, ram: 32, disk: 360, priceEUR: 60.49, priceUSD: 67.59 }
    ]
  },
  {
    id: 'sgp1',
    name: 'Singapore',
    servers: [
      { name: 'CPX11', vcpu: 2, ram: 2, disk: 40, priceEUR: 7.90, priceUSD: 9.09 },
      { name: 'CPX21', vcpu: 3, ram: 4, disk: 80, priceEUR: 14.60, priceUSD: 16.59 },
      { name: 'CPX31', vcpu: 4, ram: 8, disk: 160, priceEUR: 25.30, priceUSD: 28.59 },
      { name: 'CPX41', vcpu: 8, ram: 16, disk: 240, priceEUR: 43.10, priceUSD: 48.09 },
      { name: 'CPX51', vcpu: 16, ram: 32, disk: 360, priceEUR: 77.40, priceUSD: 86.09 }
    ]
  }
];