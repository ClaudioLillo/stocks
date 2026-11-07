'use client';

import { useEffect, useState } from 'react';
import { getSavedStocksAction, SavedFile } from '@/actions/stocks';

export default function StockList() {
  const [files, setFiles] = useState<SavedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getSavedStocksAction();
    
    if (result.success && result.files) {
      setFiles(result.files);
    } else {
      setError(result.error || 'No se pudieron cargar las acciones guardadas.');
    }
    setLoading(false);
  };

  // Cargar la lista automáticamente al montar el componente
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Registros Guardados En Servidor</h2>
        <button 
          onClick={fetchFiles}
          disabled={loading}
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-1 px-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Actualizar 🔄'}
        </button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-6 text-sm text-gray-500">Buscando archivos temporales...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-400 italic">
          No hay archivos JSON guardados todavía.
        </div>
      ) : (
        <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
          {files.map((file) => (
            <li key={file.fileName} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-sm uppercase">
                  {file.symbol}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  {file.fileName}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">
                  {new Date(file.createdAt).toLocaleDateString()}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  {new Date(file.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
