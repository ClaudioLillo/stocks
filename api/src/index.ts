import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { Stock } from './types/Stocks';

// Inicializar la aplicación de Express con su tipo correspondiente
const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

// Configuración de Middlewares
app.use(cors()); // CORS permisivo por defecto (permite cualquier origen, método y cabecera)
app.use(express.json()); // Permite a Express leer JSON en el body de las peticiones

const stocks: Stock[] = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  { ticker: 'TSLA', name: 'Tesla, Inc.' }
];
// Ruta de prueba (Endpoint de tipo GET)
app.get('/stocks', (req: Request, res: Response): void => {
  res.json({
    status: 'success',
    data: stocks,
  });
});

// Ruta de ejemplo para recibir datos (Endpoint de tipo POST)
app.post('/api/data', (req: Request, res: Response): void => {
  const { name } = req.body;
  res.json({
    message: `Datos recibidos con éxito`,
    received: { name }
  });
});

// Iniciar el servidor
app.listen(PORT, (): void => {
  console.log(`⚡️ [server]: Servidor corriendo en http://localhost:${PORT}`);
});
