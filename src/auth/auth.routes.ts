import { Router, Request, Response } from 'express';
import { login,me } from './auth.controller.js';
import { verifyToken } from './auth.middleware.js';
import { isAdmin } from './auth.middleware.admin.js';
const router = Router();

// 🔐 Ruta de login
router.get('/auth/manage', verifyToken, isAdmin, (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user
    return res.json({ message: 'Acceso autorizado', user })
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar administrador' })
  }
})
router.post('/login', login);
router.get('/me', verifyToken, me);
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
