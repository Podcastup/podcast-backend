import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';


const app = express();
app.use(cors());
const port = process.env.PORT;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


class API {
    constructor(){}
    async init(){
        app.use(router);
        app.use((req: any,res: any, next: any) => {
            next();
        });

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