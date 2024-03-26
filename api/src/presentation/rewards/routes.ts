import { Router } from "express";
import { RewardController } from "./controller";
import { RewardServiceImpl } from "../services/reward.service";
import { PostgresRewardDatasource } from "../../infrastructure/datasources/rewards/postgres-reward.datasource";
import { PostgresLocationDatasource } from "../../infrastructure/datasources/locations/postgres-location.datasource";
import { RewardRepositoryImpl } from "../../infrastructure/repositories/reward.repository";
import { LocationRepositoryImpl } from "../../infrastructure/repositories/location.repository";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { PostgresPermissionDatasourceImpl } from "../../infrastructure/datasources/permissions/postgres-permission.datasource";
import { envs } from "../../config";
import { PermissionRepositoryImpl } from "../../infrastructure/repositories/permission.repository";
import { RewardMiddleware } from "../middlewares/reward.middleware";
import { PostgresPetDatasourceImpl } from "../../infrastructure/datasources/pets/postgres-pet.datasource";
import { PetRepositoryImpl } from "../../infrastructure/repositories/pet.repository";

export class RewardRoutes {

    static get routes(): Router {

        const router = Router();

        const permissionDatasource = new PostgresPermissionDatasourceImpl(
            envs.WEBSERVICE_URL,
        );

        const permissionRepository = new PermissionRepositoryImpl(
            permissionDatasource,
        );

        const rewardDatasource = new PostgresRewardDatasource();
        const locationDatasource = new PostgresLocationDatasource();
        const userDatasource = new PostgresUserDatasourceImpl(
            permissionRepository,
            envs.WEBSERVICE_URL,
        );
        const petDatasource = new PostgresPetDatasourceImpl(
            envs.WEBSERVICE_URL,
        );

        const rewardRepository = new RewardRepositoryImpl(rewardDatasource);
        const locationRepository = new LocationRepositoryImpl(locationDatasource);
        const petRepository = new PetRepositoryImpl(petDatasource);

        const rewardService = new RewardServiceImpl(
            rewardRepository,
            locationRepository,
        );

        const rewardController = new RewardController(rewardService);

        const authMiddleware = new AuthMiddleware(userDatasource);
        const rewardMiddleware = new RewardMiddleware(petRepository);
        

        router.get('/', rewardController.getAll);
        router.post('/', [authMiddleware.validateJWT, rewardMiddleware.verifyPetOwnership ], rewardController.create);
        router.put('/', rewardController.updateById);
        router.delete('/:id', rewardController.deleteById);

        return router
    }
}