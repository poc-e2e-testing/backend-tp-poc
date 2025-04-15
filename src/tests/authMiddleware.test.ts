import { describe, it, expect, vi } from 'vitest'
import { verifyToken } from 'src/auth/auth.middleware.js'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

vi.mock('jsonwebtoken')

describe('verifyToken middleware', () => {
  const mockReq = (authHeader?: string): Partial<Request> => ({
    headers: {
      authorization: authHeader
    }
  })

  const mockRes = (): Partial<Response> => {
    const res: any = {}
    res.status = vi.fn().mockReturnValue(res)
    res.json = vi.fn().mockReturnValue(res)
    return res
  }

  const mockNext = vi.fn()

  it('debería responder 401 si no se proporciona token', () => {
    const req = mockReq() as Request
    const res = mockRes() as Response
    verifyToken(req, res, mockNext as NextFunction)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token no proporcionado' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('debería responder 401 si el token es inválido', () => {
    vi.mocked(jwt.verify).mockImplementation(() => {
      throw new Error('Invalid token')
    })

    const req = mockReq('Bearer invalid.token') as Request
    const res = mockRes() as Response
    verifyToken(req, res, mockNext as NextFunction)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido o expirado' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('debería llamar next si el token es válido', () => {
    vi.mocked(jwt.verify).mockReturnValue({ id: '123' } as any)

    const req = mockReq('Bearer valid.token') as Request
    const res = mockRes() as Response
    verifyToken(req, res, mockNext as NextFunction)

    expect(mockNext).toHaveBeenCalled()
  })
})
