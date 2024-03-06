import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { PetRoutes } from "./pets/routes";
import { PermissionRoutes } from "./permissions/routes";
import { AuthRoutes } from "./auth/routes";



export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/users',  UserRoutes.routes)
        router.use('/api/pets', PetRoutes.routes)
        router.use('/api/permissions', PermissionRoutes.routes)
        router.use('/api/auth', AuthRoutes.routes)

        return router
    }

}