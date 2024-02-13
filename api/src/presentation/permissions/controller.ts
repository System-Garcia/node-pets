import { Request, Response } from "express";
import {
  CreatePermission,
  CreatePermissionDto,
  DeletePermission,
  GetPermissionById,
  GetPermissions,
  PaginationDto,
  PermissionRepository,
  UpdatePermissionById,
  UpdatePermissionDto,
  handleError,
} from "../../domain";

export class PermissionController {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  public getPermissions = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    new GetPermissions(this.permissionRepository)
      .execute(paginationDto!)
      .then((paginatedPermissionsResponse) =>
        res.json(paginatedPermissionsResponse)
      )
      .catch((error) => handleError(error, res));
  };

  public createPermission = (req: Request, res: Response) => {
    const [error, createPermissionDto] = CreatePermissionDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreatePermission(this.permissionRepository)
      .execute(createPermissionDto!)
      .then((permission) => res.json(permission))
      .catch((error) => handleError(error, res));
  };

  public getPermissionById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'Id must be a valid number' });

    new GetPermissionById(this.permissionRepository)
      .execute(id)
      .then((permission) => res.json(permission))
      .catch((error) => handleError(error, res));
  };

  public updatePermissionById = (req: Request, res: Response) => {
        
        const id = +req.params.id;

        const [error, updatedPermissionDto] = UpdatePermissionDto.create({...req.body, id});
        if(error) return res.status(400).json({ error });

        new UpdatePermissionById(this.permissionRepository)
            .execute(updatedPermissionDto!)
            .then( permissionUpdated => res.json(permissionUpdated))
            .catch( error => handleError(error, res))
  };


  public deletePermissionById = (req: Request, res: Response) => {

        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'Id must be a valid number'})

        new DeletePermission(this.permissionRepository)
            .execute(id)
            .then( permissionDeleted => res.json(permissionDeleted))
            .catch( error => handleError(error, res))

  }

}
