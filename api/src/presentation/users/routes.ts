import { Router } from "express";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository";
import { UsersController } from "./controller";
import { PermissionRepositoryImpl } from "../../infrastructure/repositories/permission.repository";
import { PostgresPermissionDatasourceImpl } from "../../infrastructure/datasources/permissions/postgres-permission.datasource";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import fileUpload from "express-fileupload";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { S3Service } from "../services/s3.service";
import { envs } from "../../config";


export class UserRoutes {

    static get routes(): Router {

        const router = Router();

        const permissionDatasource = new PostgresPermissionDatasourceImpl(envs.WEBSERVICE_URL);
        const permissionRepository = new PermissionRepositoryImpl(permissionDatasource);
        
        const postgresDatasource = new PostgresUserDatasourceImpl(permissionRepository, envs.WEBSERVICE_URL);
        const userRepository = new UserRepositoryImpl(postgresDatasource);

        const s3Service = new S3Service({
            accessKeyId: envs.AWS_ACCESS_KEY_ID,
            bucketName: envs.AWS_BUCKET_NAME,
            region: envs.AWS_REGION,
            secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
        });

        const userController = new UsersController(userRepository, s3Service);

        const authMiddleware = new AuthMiddleware(postgresDatasource);

        const fileUploadMiddleware = fileUpload({
            limits: { fileSize: 5 * 1024 * 1024 },
            abortOnLimit: true, 
            responseOnLimit: 'The file size exceeds the allowed limit.',
        });

        router.get('/',[ authMiddleware.validateJWT, authMiddleware.verifyAdmin ] ,userController.getUsers);
        router.put('/:id', [ authMiddleware.validateJWT, authMiddleware.verifySelfOrAdmin, fileUploadMiddleware, FileUploadMiddleware.objectToArray ], userController.updateUser);
        router.put('/:id/permissions',[ authMiddleware.validateJWT, authMiddleware.verifyAdmin ], userController.updatePermissions)
        router.delete('/:id', [ authMiddleware.validateJWT, authMiddleware.verifySelfOrAdmin ], userController.deleteUser)

        return router;
    }

}