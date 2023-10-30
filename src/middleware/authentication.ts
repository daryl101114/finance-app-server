import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

class Authentication {
  public static authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token == null) return res.sendStatus(401)
      
    } catch (err) {
      console.log(er);
    }
  }
}
