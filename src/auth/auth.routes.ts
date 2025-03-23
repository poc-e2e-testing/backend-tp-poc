import { Router, Request, Response } from 'express';
import { login } from './auth.controller.js';
import { verifyToken } from './auth.middleware.js';

const router = Router();

// 🔐 Ruta de login
router.post('/login', login);

// 🛡️ Ruta protegida para obtener info del usuario autenticado
router.get('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    return res.json({ message: 'Token válido', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuario' });
  }
});

export default router;
