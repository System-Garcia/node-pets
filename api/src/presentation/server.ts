import express, { Router } from 'express'
import path from 'path';

interface Options {
    port: number,
    public_path?: string,
    routes: Router,
}


export class Server {

    // propiedad publica para poder acceder al servidor desde el testing
    public readonly app = express();
    private serverListener?:any;
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;
    


    constructor(options: Options) {
        
        const { port, routes, public_path = 'public'} = options;

        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);

        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`)
            res.sendFile(indexPath);
        });

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })

    }

    public close() {
        this.serverListener?.close();
    } 

}