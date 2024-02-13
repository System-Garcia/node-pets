import { CreatePermissionDto } from "../../dtos/permissions/create-permission.dto";
import { PermissionEntity } from "../../entities/permission.entity";
import { PermissionRepository } from "../../repositories/permission.repository";


export interface CreatePermissionUseCase {
    execute(dto: CreatePermissionDto): Promise<PermissionEntity>
};


export class CreatePermission implements CreatePermissionUseCase{

    constructor(private readonly repository: PermissionRepository) {}

    execute(dto: CreatePermissionDto): Promise<PermissionEntity> {    
        return this.repository.create(dto);
    }

}