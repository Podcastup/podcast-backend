import * as bcrypt from "bcryptjs";

const saltRounds = 10;
export default class PasswordHelper {
    /**
     * @param  {string} plainPassword
     * @returns Promise
     */
    public static async hashPassword(plainPassword: string): Promise<string> {
        const hashed = await bcrypt.hash(plainPassword, saltRounds);
        return hashed;
    }
    /**
     * @param  {string} plainPassword
     * @param  {string} hashedPassword
     * @returns Promise
     */
    public static async comparePassword(plainPassword: string,
                                        hashedPassword: string): Promise<boolean> {
        const matchedPassword = await bcrypt.compare(plainPassword, hashedPassword);
        return matchedPassword;
    }
}