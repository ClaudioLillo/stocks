'use server' // 👈 Esto le dice a Next.js que esta función SOLO se ejecuta en el servidor

import { StockFormData } from '@/components/ui/StockForm';
import { Stock } from '@/types/stocks';

export async function fetchStockData(data: StockFormData) {
  // Aquí puedes llamar a tu API financiera usando tus API keys privadas de forma segura
  console.log("Buscando en el servidor:", data.ticker, data.startDate, data.endDate);
  
  // const res = await fetch(`https://finanzas.com{data.ticker}...`);
  // return await res.json();
}

export async function getStockList(): Promise<Stock[]>{
    const data = await fetch('http://localhost:4000/stocks');
    const stocks = await data.json();
    console.log("stocks: ", stocks);
    return stocks.data as Stock[];     
}