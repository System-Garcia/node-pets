import { Router } from "express";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository";
import { UsersController } from "./controller";


export class UserRoutes {

    static get routes(): Router {

        const router = Router();

        const postgresDatasource = new PostgresUserDatasourceImpl();
        const userRepository = new UserRepositoryImpl(postgresDatasource);
        const userController = new UsersController(userRepository);

        router.get('/', userController.getUsers);
        router.post('/', userController.createUser);
        router.post('/login', userController.loginUser)

        return router;
    }

}