import express from 'express'

declare global {
    namespace Express {
        interface Request {
            currentUser?: Record<string,any>
        }
    }
}