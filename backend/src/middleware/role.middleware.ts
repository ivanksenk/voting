import { NextFunction, Request, Response } from "express"

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
    try {
        next()
    } catch (error) {
        return res.status(401).send({
            status: 401,
            message: 'Forbidden'
        })
    }
}