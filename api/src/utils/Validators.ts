
export default class Validator {
    /**
     * @param  {string} password
     * @returns {boolean}
     */
    public static validatePassword(password: string): {
        strength: string; valid: boolean
    } {
        const strongRegex: RegExp = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})",
        );
        const mediumRegex: RegExp = new RegExp(
            "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
        );
        if (strongRegex.test(password)) {
            return {strength: "strong", valid: true};
        } else if (mediumRegex.test(password)) {
            return {strength: "medium", valid: true};
        }
        return {strength: "weak", valid: false};
    }

    public static validateEmail(email: string): boolean {
        // tslint:disable-next-line:max-line-length
        const emailRegEx: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegEx.test(String(email).toLowerCase());
    }
}