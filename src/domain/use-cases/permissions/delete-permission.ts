import { PermissionEntity } from "../../entities/permission.entity";
import { PermissionRepository } from "../../repositories/permission.repository";

interface DeletePermissionUseCase {
    execute(id: number): Promise<PermissionEntity>;
};


export class DeletePermission implements DeletePermissionUseCase {

    constructor( private readonly repository: PermissionRepository){}

    execute(id: number): Promise<PermissionEntity> {
        return this.repository.deleteById(id);
    }

}