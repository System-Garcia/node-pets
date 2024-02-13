import { Router } from "express";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository";
import { UsersController } from "./controller";
import { PermissionRepositoryImpl } from "../../infrastructure/repositories/permission.repository";
import { PostgresPermissionDatasourceImpl } from "../../infrastructure/datasources/permissions/postgres-permission.datasource";


export class UserRoutes {

    static get routes(): Router {

        const router = Router();

        const permissionDatasource = new PostgresPermissionDatasourceImpl();
        const permissionRepository = new PermissionRepositoryImpl(permissionDatasource);
        
        const postgresDatasource = new PostgresUserDatasourceImpl(permissionRepository);
        const userRepository = new UserRepositoryImpl(postgresDatasource);
        const userController = new UsersController(userRepository);

        router.get('/', userController.getUsers);
        router.post('/', userController.createUser);
        router.put('/:id', userController.updateUser);
        router.post('/login', userController.loginUser);

        return router;
    }

}