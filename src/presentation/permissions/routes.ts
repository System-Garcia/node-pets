import { Router } from "express";
import { PostgresPermissionDatasourceImpl } from "../../infrastructure/datasources/permissions/postgres-permission.datasource";
import { PermissionRepositoryImpl } from '../../infrastructure/repositories/permission.repository';
import { PermissionController } from "./controller";



export class PermissionRoutes {

    static get routes(): Router {

        const router = Router();
        const postgresDatasource = new PostgresPermissionDatasourceImpl();
        const permissionRepository = new PermissionRepositoryImpl(postgresDatasource);
        const permissionController = new PermissionController(permissionRepository);

        router.post('/', permissionController.createPermission);
        router.get('/:id', permissionController.getPermissionById);
        router.get('/', permissionController.getPermissions);
        router.put('/:id', permissionController.updatePermissionById);
        router.delete('/:id', permissionController.deletePermissionById)

        return router;
    }

}