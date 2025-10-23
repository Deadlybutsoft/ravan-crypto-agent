import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { config } from './config';
import { chatRouter } from './routes/chat.route';

const port = config.port;
const app = new Hono();

// CORS middleware
app.use('*', cors({
  origin: config.cors.allowedOrigins,
  allowHeaders: ['Content-Type'],
  allowMethods: ['POST', 'GET'],
}));

// Routes
app.route('/api', chatRouter);

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// Default greeting
app.get('/', (c) =>
  c.json({
    message: 'Welcome to Ravan - AI Crypto Commander Backend',
    version: '1.0.0',
  })
);

// Start the server
console.log(`🚀 Ravan Backend Server starting on port ${port}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

serve({
  fetch: app.fetch,
  port: port as number,
});

console.log(`✅ Server started at http://localhost:${port}`);

// For testing purposes
export { app };
