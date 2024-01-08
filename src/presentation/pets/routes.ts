import { Router } from "express";



export class PetRoutes {


    static get routes(): Router {

        const router = Router();

        router.get('/', (req, res) => {
            res.json('devolviendo mascotas')
        })

        return router;
    }

}