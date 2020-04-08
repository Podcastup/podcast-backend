import {Request, Response} from "express";

export interface IController {
    deleteRecord: (request: Request, response: Response) => any;
    updateRecord: (request: Request, response: Response) => any;
    findAllRecords: (request: Request, response: Response) => any;
    createRecord: (request: Request, response: Response) => any;
    findOneRecord: (request: Request, response: Response) => any;

}