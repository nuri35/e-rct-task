import jwt from 'jsonwebtoken';

interface UserPayload {
  id: number;
}

export class TokenProvider {
  constructor() {}

  static signJWT(id: number): string {
    const token = jwt.sign({ id: id }, process.env.JWT_KEY!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  static generateUrlToken(id: number): string {
    const token = TokenProvider.signJWT(id);
    return `http://${process.env.AUTH_HOST}/api/user/wVerify?token=${token}`;
  }

  static verifyJWT(token: string): UserPayload {
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    return decoded;
  }
}
