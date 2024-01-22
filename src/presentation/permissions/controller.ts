import { Request, Response } from "express";
import { PermissionRepository } from "../../domain/repositories/permission.repository";
import { CreatePermission, CreatePermissionDto } from "../../domain";
import { handleError } from "../../domain/errors/handle-error";


export class PermissionController {


    constructor(private readonly permissionRepository: PermissionRepository) {}

    public getPermissions = (req: Request, res: Response) => {
        
    };

    public createPermission = (req: Request, res: Response) => {

        const [error, createPermissionDto] = CreatePermissionDto.create(req.body);

        if(error) return res.status(400).json({ error });

        new CreatePermission(this.permissionRepository)
            .execute(createPermissionDto!)
            .then( permission => res.json(permission))
            .catch( error => handleError(error, res));
    }

}