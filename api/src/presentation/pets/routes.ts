import { Router } from "express";
import { PostgresPetDatasourceImpl } from "../../infrastructure/datasources/pets/postgres-pet.datasource";
import { PetRepositoryImpl } from "../../infrastructure/repositories/pet.repository";
import { PetController } from "./controller";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { PostgresPermissionDatasourceImpl } from '../../infrastructure/datasources/permissions/postgres-permission.datasource';
import { PermissionRepositoryImpl } from "../../infrastructure/repositories/permission.repository";
import { S3Service } from "../services/s3.service";
import fileUpload from "express-fileupload";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { PetMiddleware } from "../middlewares/pet.middleware";



export class PetRoutes {


    static get routes(): Router {

        const router = Router();

        const postgresPetDatasource = new PostgresPetDatasourceImpl(envs.WEBSERVICE_URL);
        const petRepository = new PetRepositoryImpl(postgresPetDatasource);

        const s3Service = new S3Service({
            accessKeyId: envs.AWS_ACCESS_KEY_ID,
            secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
            region: envs.AWS_REGION,
            bucketName: envs.AWS_BUCKET_NAME,
        });

        const petController = new PetController(petRepository, s3Service);

        const permissionDatasource = new PostgresPermissionDatasourceImpl(envs.WEBSERVICE_URL);
        const permissionRepository = new PermissionRepositoryImpl(permissionDatasource);

        const userDatasource = new PostgresUserDatasourceImpl(permissionRepository, envs.WEBSERVICE_URL);
        const authMiddleware = new AuthMiddleware(userDatasource);

        const fileUploadMiddleware = fileUpload({
            limits: { fileSize: 5 * 1024 * 1024 },
            abortOnLimit: true, 
            responseOnLimit: 'The file size exceeds the allowed limit.',
        });

        const petMiddleware = new PetMiddleware(petRepository);

        router.get('/', [authMiddleware.validateJWT, authMiddleware.verifyAdmin ], petController.getPets);
        router.post('/',[ fileUploadMiddleware,  authMiddleware.validateJWT, FileUploadMiddleware.containFiles ], petController.createPet);
        router.delete('/:id', [ authMiddleware.validateJWT, petMiddleware.verifyOwnership ], petController.deletePet);
        router.get('/my-pets', [ authMiddleware.validateJWT ], petController.getUserPets);

        return router;
    }

}