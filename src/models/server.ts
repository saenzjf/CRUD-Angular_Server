import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/producto';
import db from '../db/connection';

class Server{

    private app: Application;
    private port: string;

    constructor(){
        console.log(process.env.PORT);
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        });
    }

    routes(){
        this.app.get('/', (req: Request , res: Response ) => {
            res.json({
                msg: 'API working'
            })
        })

        this.app.use('/api/productos', routesProducto);
    }

    midlewares(){
        //Son funciones que se ejecutan antes de algo

        //Parseamos el body
        this.app.use(express.json());


        //cors
        this.app.use(cors());

    }

    async dbConnect(){
        
        try {
            await db.authenticate();
            console.log("BD conectada");
        } catch (error) {
            console.log(error);
            console.log('Error al conectar BD');
        }
    }


}

export default Server;