import jwt, { type JwtPayload, type PrivateKey, type PublicKey, type Secret, type SignOptions, type VerifyOptions } from "jsonwebtoken"

type JWT_PAYLOAD = { sub: string; name: string };
const JWT_SECRET = 'JWT_SECRET';
export const signJWT = (payload: JWT_PAYLOAD, options?: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
};