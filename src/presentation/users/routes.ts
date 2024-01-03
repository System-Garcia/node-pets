import { Router } from "express";


export class UserRoutes {

    static get routes(): Router {

        const router = Router();

        router.get('/', (req, res) => {

            res.json({message: 'ok'})

        })


        return router;
    }

}