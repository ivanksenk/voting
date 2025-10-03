import { NextFunction, Request, Response } from "express"

export const ipDetect = (req: Request, res: Response, next: NextFunction) => {
    let ip = req.ip;
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
        if (Array.isArray(forwardedFor)) {
            ip = forwardedFor[0].split(',')[0].trim();
        } else {
            ip = forwardedFor.split(',')[0].trim();
        }
    }
    (req as any).clientIp = ip;
    next();
}