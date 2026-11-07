'use client';

import { useState } from 'react';
import { saveStockDataAction } from '@/actions/stocks'; // Ajusta la ruta de tu action si es necesario

export default function StockDownloader() {
  const [symbol, setSymbol] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !start || !end) return;

    setLoading(true);
    setStatus(null);

    try {
      const queryParams = new URLSearchParams({ symbol, start, end });
      const response = await fetch(`/api/stocks?${queryParams.toString()}`); // Ajusta si tu ruta tiene otra estructura de carpetas

      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }

      const stocksData = await response.json();

      if (stocksData.error) {
        throw new Error(stocksData.error);
      }

      if (!Array.isArray(stocksData) || stocksData.length === 0) {
        throw new Error('No se encontraron registros para este rango de fechas o símbolo.');
      }

      const actionResult = await saveStockDataAction(symbol,stocksData);

      if (actionResult.success) {
        setStatus({
          type: 'success',
          message: `¡Guardado con éxito! Archivo: ${symbol}.json en la ruta temporal del servidor.`,
        });
      } else {
        throw new Error(actionResult.error || 'No se pudo guardar el archivo en el servidor.');
      }

    } catch (error: any) {
      console.error(error);
      setStatus({
        type: 'error',
        message: error.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Descargar Historial de Acciones</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Ticker de la Acción</label>
          <input
            type="text"
            placeholder="Ej: AAPL, TSLA, BTC-USD"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha de Inicio</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha de Término</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400"
        >
          {loading ? 'Procesando consulta...' : 'Obtener y Guardar JSON'}
        </button>
      </form>

      {status && (
        <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
          status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
