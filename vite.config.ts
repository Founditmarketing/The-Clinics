import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Serves the /api/gemini serverless function during `npm run dev`, since Vite's
// dev server doesn't run Vercel functions on its own. In production, Vercel
// runs api/gemini.ts directly. The API key is read server-side only.
function devApiPlugin(geminiKey: string): Plugin {
  return {
    name: 'dev-api-gemini',
    configureServer(server) {
      // Make the key available to the handler via process.env, exactly like
      // it will be on Vercel — without exposing it to the client bundle.
      if (geminiKey) process.env.GEMINI_API_KEY = geminiKey;

      server.middlewares.use('/api/gemini', async (req, res) => {
        try {
          const mod = await server.ssrLoadModule('/api/gemini.ts');
          await mod.default(req, res);
        } catch (err) {
          server.config.logger.error(`/api/gemini failed: ${err}`);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Dev API handler error.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), devApiPlugin(env.GEMINI_API_KEY)],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
