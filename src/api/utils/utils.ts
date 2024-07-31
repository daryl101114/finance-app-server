import { hash, compare,genSalt } from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const {SECRET_KEY=""} = process.env

/**
 * Interface Definition
 */
interface IVerifyToken {
  (req:Request, res:Response, next:NextFunction): Promise<void>
}
interface IEncrypt {
  (text: string | Buffer): Promise<string>;
}
interface IDecrypt {
  (data: string | Buffer, encrypted: string): Promise<boolean>;
}

/**
 * Encrypt Text
 * @param str
 * @returns Hashed Text
 */
const encryptText: IEncrypt = async (str) => {
  const SALT = await genSalt(10);
  try {
    return await hash(str, SALT);
  } catch (err) {
    console.log("@encryptText() :", err);
    throw new Error("Failed to hash input");
  }
};

/**
 * Compare text to hashed text
 * @param str
 * @param encrypted
 * @returns
 */
const compareText: IDecrypt = async (str, encrypted): Promise<boolean> => {
  try {
    return await compare(str, encrypted);
  } catch (err) {
    console.log("@compareText():", err);
    throw new Error("Failed to Compare Text");
  }
};


/**
 * Async function that verifies a token to access API
 * @param req 
 * @param res 
 * @param next 
 * @returns void
 */
const verifyToken:IVerifyToken =  async(req:Request, res:Response, next:NextFunction): Promise<void> => {
  console.log("VERIFYING",req.headers)
  const bearerHeader = req.headers["authorization"]
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    console.log(bearerToken)
    verify(bearerToken, SECRET_KEY, (err, result) => {
      if(err) { res.sendStatus(403) }
      else{ next() }
   }) 
  }
   else {
    res.sendStatus(403)
   }
}

export { compareText, encryptText, verifyToken };
