import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import router from './routes';
import {errors} from "celebrate";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

const app = express();
app.use(cors());
const port = process.env.PORT;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


class API {
    constructor(){}
    async init(){
        app.use(passport.initialize());
        require('./utils/passport')(passport);
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(router);
        app.use((req: any,res: any, next: any) => {
            next();
        });
        app.use(errors());

        app.listen(port, () => {
            console.log(`Server successfully running on port ${port}`);
        });
    }
}

let api = new API();
api.init();

process.on('SIGINT', () => {
    console.log('SIGINT Connection closed.');
    process.exit();
});


export default app;