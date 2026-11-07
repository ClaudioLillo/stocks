import { NextResponse } from 'next/server';
import { HistoricalOptions } from "yahoo-finance2/modules/historical";
import yahoo from "../../../lib/yahoo";

type YahooStock = {
  symbol: string;
  date: Date;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
};

// Next.js pasa el objeto 'request' automáticamente a la función GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!symbol || !start || !end) {
    return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 });
  }

  const queryOptions: HistoricalOptions = {
    period1: start,
    period2: end,
    interval: "1d",
  };

  try {
    const res = await yahoo.historical(symbol, queryOptions);
    const data = res.map((item: YahooStock) => ({
      ...item,
      date: item.date.toISOString().split("T")[0],
    }));
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
