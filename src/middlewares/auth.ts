import { Request, Response, NextFunction } from "express";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { UserInstance } from "src/models/User.js";
import { jwtService } from "src/services/jwtService.js";
import { userService } from "src/services/userService.js";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) return res.status(401).json({
        message: 'Não autorizado: nenhum token foi encontrado'
    })

    // Bearer *token*
    const token = authorizationHeader.replace(/Bearer /, '') // Remoção do termo bearer e mantendo apenas o token

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido'
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { token } = req.query

    if (!token) return res.status(401).json({
        message: 'Não autorizado: nenhum token foi encontrado'
    })

    if (typeof token !== 'string') return res.status(400).json({
        message: 'O parâmetro token deve ser do tipo string'
    })

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido'
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })

}
