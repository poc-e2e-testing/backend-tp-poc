// src/auth/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { orm } from '../shared/db/orm.js';
import { Client } from '../client/client.entity.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const em = orm.em.fork(); // recomendable para MikroORM
    const client = await em.findOne(Client, { id: decoded.id }, { populate: ['clientClass'] });

    if (!client) {
      return res.status(401).json({ message: 'Token inválido o cliente no encontrado' });
    }

    // Ahora req.user contiene una instancia completa del Client
    (req as any).user = client;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

