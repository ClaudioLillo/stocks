import { fetchStockData, getStockList } from "@/actions/stocks";
import StockForm from "@/components/ui/StockForm";

export default async function List() {
    const list = await getStockList();
  return (
    <div>
    <div>Listas</div>
    {list.map((stock)=>(<div key={stock.ticker}>{stock.ticker} - {stock.name}</div>))}
    
    <StockForm onSubmit={fetchStockData}/>
    </div>
  );
}
