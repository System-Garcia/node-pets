import { Router } from "express";
import { PostgresPetDatasourceImpl } from "../../infrastructure/datasources/pets/postgres-pet.datasource";
import { PetRepositoryImpl } from "../../infrastructure/repositories/pet.repository";
import { PetController } from "./controller";



export class PetRoutes {


    static get routes(): Router {

        const router = Router();

        const postgresPetDatasource = new PostgresPetDatasourceImpl();
        const petRepository = new PetRepositoryImpl(postgresPetDatasource);

        const petController = new PetController(petRepository);

        router.get('/', petController.getPets);

        return router;
    }

}