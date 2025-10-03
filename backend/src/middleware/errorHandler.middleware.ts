import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    constructor(public statusCode: number, public message: string) {
        super(message);
        this.name = 'IdeasAppError';
    }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message
        });
    }

    console.error('Unexpected error:', error);
    res.status(500).json({
        error: 'Internal server error'
    });
};