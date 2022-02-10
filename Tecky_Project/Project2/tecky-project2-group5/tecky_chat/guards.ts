import { Request, Response, NextFunction } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.session?.["user_name"]) {
        next();
    } else {
        res.redirect("/login.html");
    }
}

export function isLoggedInAPI(req: Request, res: Response, next: NextFunction) {
    if (req.session?.["user_name"]) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}


