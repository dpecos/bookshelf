import cors from 'cors';
import express from 'express';

export function setupCORS(app: express.App) {
  app.use(cors());
}
