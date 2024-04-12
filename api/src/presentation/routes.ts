import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { PetRoutes } from "./pets/routes";
import { PermissionRoutes } from "./permissions/routes";
import { AuthRoutes } from "./auth/routes";
import { SpeciesRoutes } from "./species/routes";
import { RewardRoutes } from "./rewards/routes";



export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/users',  UserRoutes.routes)
        router.use('/api/pets', PetRoutes.routes)
        router.use('/api/permissions', PermissionRoutes.routes)
        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/species', SpeciesRoutes.routes)
        router.use('/api/rewards', RewardRoutes.routes)

        return router
    }

}