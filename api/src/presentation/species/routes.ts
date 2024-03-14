import { Router } from "express";
import { PostgresSpeciesDatasourceImpl } from "../../infrastructure/datasources/species/postgres-species.datasource";
import { SpeciesRepositoryImpl } from "../../infrastructure/repositories/species.repository";
import { SpeciesController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { PostgresPermissionDatasourceImpl } from "../../infrastructure/datasources/permissions/postgres-permission.datasource";
import { envs } from "../../config";
import { PermissionRepositoryImpl } from "../../infrastructure/repositories/permission.repository";


export class SpeciesRoutes {

    static get routes(): Router {
        const router = Router();

        const speciesDatasource = new PostgresSpeciesDatasourceImpl(envs.WEBSERVICE_URL);
        const speciesRepository = new SpeciesRepositoryImpl(speciesDatasource);

        const speciesController = new SpeciesController(speciesRepository);

        const permissionDatasource = new PostgresPermissionDatasourceImpl(envs.WEBSERVICE_URL);
        const permissionRepository = new PermissionRepositoryImpl(permissionDatasource);

        const userDatasource = new PostgresUserDatasourceImpl(
            permissionRepository,
            envs.WEBSERVICE_URL,
        );

        const authMiddleware = new AuthMiddleware(userDatasource);

        router.post('/', [authMiddleware.validateJWT, authMiddleware.verifyAdmin] ,speciesController.createSpecies);
        router.get('/', speciesController.getAllSpecies)


        return router;
    }
}