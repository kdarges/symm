import { prisma } from "../database";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader: string = req.headers.authorization
        const bearer: string = 'Bearer ';
    
        // if no token
        if (!authHeader || !authHeader.startsWith(bearer)) {
            res.status(401).send({ "error": "Access denied. No credentials sent!" })
        }
    
        // remove 'Bearer ' from token string
        const token = authHeader.replace(bearer, '')
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        const user = await prisma.user.findFirst({
            where: { id: decoded["userId"] }
        })
    
        if (!user) {
            res.status(401).send({ "error": "Authentication failed!" })
        }
    
        req.currentUser = user
        next()
    } catch (e) {
        res.status(401).send({ "error": "Authentication failed!" })
    }

}