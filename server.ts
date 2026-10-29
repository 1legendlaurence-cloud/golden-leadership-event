import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import handler from './api/send-email.js';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Mount /api/send-email endpoint for dev server
  app.post('/api/send-email', async (req, res) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      console.error('API Error in dev server:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

  // Mount Vite development middlewares
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
