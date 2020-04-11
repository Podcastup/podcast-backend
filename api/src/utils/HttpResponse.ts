import { Response } from "express";

export default class HttpResponse {
    /**
     * @param  {Response} response
     * @param  {object} data
     * @param  {string} success
     * @param  {number} statusCode
     * @param  {string} message
     * @returns {response}
     */
    public static sendResponse(response: Response, success: boolean,
                               statusCode?: number, message?: string, data?: any) {
        const body = {
            data,
            message,
            success,
        };
        if (!data) {
            delete body.data;
        }
        if (!message) {
            delete body.message;
        }
        return response.status(statusCode || 200).send(body);
    }

    /**
     * @param {any} response:Response
     * @param {any} success:string
     * @param {any} statusCode:number
     * @param {any} message:string
     * @param {any} error
     * @returns {response}
     */
    public static sendErrorResponse(response: Response,
                                    statusCode: number, message: string, error:Error) {

        return response.status(statusCode || 500).send({
            message: error.message ? error.message : message,
            success: false,
        });
    }

}