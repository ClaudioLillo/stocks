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
    return [
        {ticker: "AAPL", name: "Apple Inc."},
        {ticker: "MSFT", name: "Microsoft Corporation"},
        {ticker: "GOOG", name: "Alphabet Inc."},
        {ticker: "AMZN", name: "Amazon.com, Inc."},
        {ticker: "TSLA", name: "Tesla, Inc."},
    ];
}