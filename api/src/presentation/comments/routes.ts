import { Router } from "express";
import { CommentController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PostgresUserDatasourceImpl } from "../../infrastructure/datasources/users/postgres-user.datasource";
import { PostgresPermissionDatasourceImpl } from "../../infrastructure/datasources/permissions/postgres-permission.datasource";
import { envs } from "../../config";
import { PermissionRepositoryImpl } from "../../infrastructure/repositories/permission.repository";

export class CommentRoutes {
  static get routes(): Router {
    const router = Router();

    const commentController = new CommentController();

    const postgresPermissionDatasource = new PostgresPermissionDatasourceImpl(
      envs.WEBSERVICE_URL
    );
    const permissionRepository = new PermissionRepositoryImpl(
      postgresPermissionDatasource
    );

    const postgresUserDatasource = new PostgresUserDatasourceImpl(
      permissionRepository,
      envs.WEBSERVICE_URL
    );

    const authMiddleware = new AuthMiddleware(postgresUserDatasource);

    router.get("/", commentController.getAllComments);
    router.post("/", [ authMiddleware.validateJWT ] , commentController.createComment);
    router.put("/:id", [ authMiddleware.validateJWT, authMiddleware.verifySelfOrAdmin ] , commentController.updateComment);
    router.delete("/:id", [ authMiddleware.validateJWT, authMiddleware.verifySelfOrAdmin  ], commentController.deleteComment);

    return router;
  }
}
