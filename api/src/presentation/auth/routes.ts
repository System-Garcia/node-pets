import { Router } from "express";
import { AuthController } from "./controller";
import { envs } from "../../config";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { PostgresPermissionDatasourceImpl } from "../../infrastructure/datasources/permissions/postgres-permission.datasource";
import { PermissionRepositoryImpl } from "../../infrastructure/repositories/permission.repository";
import { AuthService } from "../services/auth.service";
import { SmtpEmailService } from "../services/email.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { S3Service } from "../services/s3.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { userExistsMiddleware } from "../middlewares/userExistsMiddleware";
import fileUpload from "express-fileupload";

export class AuthRoutes {

    static get routes(): Router{

        const router = Router();

        const permissionDatasource = new PostgresPermissionDatasourceImpl(envs.WEBSERVICE_URL);
        const permissionRepository = new PermissionRepositoryImpl(permissionDatasource);

        const userDatasource = new PostgresUserDatasourceImpl(permissionRepository, envs.WEBSERVICE_URL);
        const userRepository = new UserRepositoryImpl(userDatasource);

        const emailService = new SmtpEmailService(
            envs.MAILER_SERVICE, 
            envs.MAILER_EMAIL, 
            envs.MAILER_SECRET_KEY, 
            envs.SEND_EMAIL,
        );

        const authService = new AuthService(
            userRepository, 
            emailService, 
            envs.JWT_SEED, 
            envs.WEBSERVICE_URL,
            envs.FRONTEND_URL,
        );

        const s3Service = new S3Service({
            accessKeyId: envs.AWS_ACCESS_KEY_ID,
            bucketName: envs.AWS_BUCKET_NAME,
            region: envs.AWS_REGION,
            secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
        });

        const authController = new AuthController(
            authService,
            s3Service,
        );

        const existsUserMiddleware = userExistsMiddleware(userRepository);

        const fileUploadMiddleware = fileUpload({
            limits: { fileSize: 5 * 1024 * 1024 },
            abortOnLimit: true, 
            responseOnLimit: 'The file size exceeds the allowed limit.',
        });

        const authMiddleware = new AuthMiddleware(userDatasource);

        router.post('/login', authController.loginUser);
        router.post('/register', [ fileUploadMiddleware, existsUserMiddleware, FileUploadMiddleware.containFiles ], authController.registerUser);
        router.get('/validate-email/:token', authController.validateEmail);
        router.post('/forgot-password', authController.forgotPassword);
        router.post('/reset-password', authController.resetPassword);
        router.post('/check-session', [authMiddleware.validateJWT] , authController.checkSession);

        return router;
    }

}