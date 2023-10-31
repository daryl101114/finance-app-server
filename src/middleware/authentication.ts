import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

const { SECRET_KEY = "" } = process.env;
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

class Authentication {
  public static authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      // Return when no token is found
      if (token == null) throw new Error();

      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;

      next();
    } catch (err) {
      console.log(err);
      res.status(401).send("Please authenticate");
    }
  }
}

export { Authentication };
