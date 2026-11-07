'use client';

import { Investment } from '@/types/investments';
import {useState} from 'react';

function getProjectedValue(investment: Investment, years: number): number {
    let initial = investment.value;
    for (let i=0; i < years; i++){
        initial *= (1 + (investment.averageAnnualReturn + investment.dividendYield) / 100);
        initial += 12 * investment.value;
    }
    return initial;
}

export default function Planner() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [investmentForm, setInvestmentForm] = useState<Investment>({
        name: '',
        ticker: '',
        dividendYield: 0,
        averageAnnualReturn: 0,
        value: 0,
    });
    const addInvestment = (investment: Investment) => {
        setInvestments([...investments, investment]);
    };
    const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvestmentForm({
            ...investmentForm,
            [name]: value
        });
    };
  return (
    <div>
        <div>Planificador de inversiones</div>
        <div className="border-4 border-gray-300 p-4 rounded-lg max-w-md mx-auto mt-4">
            <div>Nueva Inversion</div>
            <div className="flex flex-col gap-2">
            <input className="border border-gray-300 p-2 rounded" type="text" placeholder="Nombre" name="name" onChange={handleInvestmentChange} />
            <input className="border border-gray-300 p-2 rounded" type="text" placeholder="Ticker" name="ticker" onChange={handleInvestmentChange} />
            <input className="border border-gray-300 p-2 rounded" type="number" placeholder="Tasa de Dividendo Anual" name="dividendYield" onChange={handleInvestmentChange} />
            <input className="border border-gray-300 p-2 rounded" type="number" placeholder="Retorno Anual Promedio" name="averageAnnualReturn" onChange={handleInvestmentChange} />
            <input className="border border-gray-300 p-2 rounded" type="number" placeholder="Valor de la Inversión" name="value" onChange={handleInvestmentChange} />
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => addInvestment(investmentForm)}>
                Agregar
            </button>
            </div>
        </div>
        <div className="border-4 border-gray-300 p-4 rounded-lg max-w-md mx-auto mt-4">
            <div>Inversiones</div>
            <ul className="list-disc pl-5">
                {investments.map((investment, index) => (
                    <li key={index}>
                        {investment.name} ({investment.ticker}) - Tasa de Dividendo: {investment.dividendYield}% - Retorno Anual Promedio: {investment.averageAnnualReturn}% - Valor: ${investment.value}
                    </li>
                ))}
            </ul>
        </div>
        <div className="border-4 border-gray-300 p-4 rounded-lg max-w-md mx-auto mt-4">
            <div>Proyección de Inversiones</div>
            {investments.map((investment, index) => (
                <div key={index}>
                    <p>{investment.name} ({investment.ticker})</p>
                    <p>Valor Proyectado en 5 años: ${getProjectedValue(investment, 5).toFixed(2)}</p>
                    <p>Valor Proyectado en 10 años: ${getProjectedValue(investment, 10).toFixed(2)}</p>
                </div>
            ))}
        </div>
    </div>
  );
}
