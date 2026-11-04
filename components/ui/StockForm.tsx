"use client";

import { useState } from 'react';

// 1. Definimos los tipos de datos que manejará el formulario usando interfaces/types como aprendimos
export interface StockFormData {
  ticker: string;
  startDate: string;
  endDate: string;
}

interface StockFormProps {
  onSubmit: (data: StockFormData) => void;
  isLoading?: boolean;
}

export default function StockForm({ onSubmit, isLoading = false }: StockFormProps) {
  // 2. Controlamos el estado de los inputs
  const [formData, setFormData] = useState<StockFormData>({
    ticker: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Convertimos el ticker a mayúsculas automáticamente para mantener consistencia financiera (ej: AAPL)
      [name]: name === 'ticker' ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validamos que no haya campos vacíos antes de enviar
    if (!formData.ticker || !formData.startDate || !formData.endDate) return;
    
    onSubmit(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">Consulta de Acciones</h2>
      
      {/* Input de Ticker */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ticker" className="text-sm font-medium text-gray-700">
          Símbolo de la Acción (Ticker)
        </label>
        <input
          type="text"
          id="ticker"
          name="ticker"
          value={formData.ticker}
          onChange={handleChange}
          placeholder="Ej: AAPL, MSFT, GOOG"
          required
          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
        />
      </div>

      {/* Inputs de Fechas (en grid de 2 columnas) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
            Fecha Inicio
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
            Fecha Fin
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            {/* Spinner de carga simple con Tailwind */}
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Buscando datos...
          </>
        ) : (
          'Obtener Historial'
        )}
      </button>
    </form>
  );
}
