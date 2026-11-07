
'use server';

import fs from 'fs';
import path from 'path';
import os from 'os';
import { Stock } from '@/types/stocks';

export interface SavedFile {
  fileName: string;
  symbol: string;
  createdAt: string;
}

export async function saveStockDataAction(symbol: string, stocks: Stock[]) {
  try {
    const tempDir = os.tmpdir();
    const subDir = path.join(tempDir, 'stocks');

    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }
    const fileName = `${symbol}.json`;
    const filePath = path.join(subDir, fileName);


    fs.writeFileSync(filePath, JSON.stringify(stocks, null, 2), 'utf-8');

    console.log(`Archivo guardado exitosamente en: ${filePath}`);

    return { 
      success: true, 
      message: `Guardado en servidor: ${fileName}`, 
      savedPath: filePath,
      data: stocks, 
    };

  } catch (error: any) {
    console.error('Error en saveStockDataAction:', error);
    return { success: false, error: error.message || 'Error desconocido' };
  }
};

export async function getSavedStocksAction(): Promise<{ success: boolean; files?: SavedFile[]; error?: string }> {
  try {
    const tempDir = os.tmpdir();
    const subDir = path.join(tempDir, 'stocks');
    
    if (!fs.existsSync(subDir)) {
      return { success: true, files: [] };
    }

    const files = fs.readdirSync(subDir);

    const stockFiles: SavedFile[] = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const filePath = path.join(subDir, file);
        const stats = fs.statSync(filePath);
        
        const symbol = file.replace('.json', ''); 

        return {
          fileName: file,
          symbol: symbol,
          createdAt: stats.mtime.toISOString(),
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { success: true, files: stockFiles };
  } catch (error: any) {
    console.error('Error leyendo directorio de acciones:', error);
    return { success: false, error: error.message || 'Error al leer los archivos' };
  }
};