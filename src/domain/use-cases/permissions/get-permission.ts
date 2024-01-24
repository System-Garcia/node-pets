import { PermissionRepository } from '../../repositories/permission.repository';
import { PermissionEntity } from "../../entities/permission.entity";

interface GetPermissionByIdUseCase {
    execute(id: number): Promise<PermissionEntity>;
};


export class GetPermissionById implements GetPermissionByIdUseCase {

    constructor(private readonly repository : PermissionRepository) { }

    execute(id: number): Promise<PermissionEntity> {
        return this.repository.findById(id);
    };

}

