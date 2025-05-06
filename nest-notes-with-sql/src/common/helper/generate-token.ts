
import * as jwt from 'jsonwebtoken';

export const key = "Thi5.i5$ecretKEy5"


export const generateToken = (payload: any): string => {
  return jwt.sign(payload, key, { expiresIn: "90d" })
}



