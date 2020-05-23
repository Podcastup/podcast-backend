import jwt from "jsonwebtoken";
const keys = process.env;

export default class TokenHelper {
    /**
     * @param  {object} payload
     * @returns Promise
     */
    public static async generateToken(payload: object): Promise<string> {
        const signature: any = {algorithm: "HS256", expiresIn: "30d"};
        const token =  jwt.sign(payload, keys.JWT_SECRET, signature);
        return `${token}`;
    }

    public static async decodeToken(token: string): Promise<any> {
        const decoded = await jwt.verify(token, keys.JWT_SECRET);
        return decoded;
    }
}