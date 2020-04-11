
import * as Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";

export default class JoiHelper {
    /**
     * @param  {Request} req
     * @param  {Response} res
     * @param  {NextFunction} next
     * @param  {object} schema
     * @param  {object} options={}
     */
    // public static validateRequestBody(req: Request , res: Response,
    //                                   next: NextFunction, schema: object, options= {}) {
    //     const { body } = req;
    //     const { error } = Joi.validate(body, schema, {...options, abortEarly: false});
    //     const errors: string[] = [];
    //     if (error) {
    //         error.details.forEach((e) => {
    //             errors.push(e.message);
    //         });
    //         return res.status(400).send({
    //             errors,
    //             success: false,
    //         });
    //     }
    //     return next();
    // }
}