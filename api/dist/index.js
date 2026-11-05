"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const stocks = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    { ticker: 'AMZN', name: 'Amazon.com, Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
    { ticker: 'TSLA', name: 'Tesla, Inc.' }
];
app.get('/stocks', (req, res) => {
    res.json({
        status: 'success',
        data: stocks,
    });
});
app.post('/api/data', (req, res) => {
    const { name } = req.body;
    res.json({
        message: `Datos recibidos con éxito`,
        received: { name }
    });
});
app.listen(PORT, () => {
    console.log(`⚡️ [server]: Servidor corriendo en http://localhost:${PORT}`);
});
