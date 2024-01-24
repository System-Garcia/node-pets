import { UpdatePermissionDto } from '../../dtos/permissions/update-permission.dto';
import { PermissionEntity } from '../../entities/permission.entity';
import { PermissionRepository } from '../../repositories/permission.repository';

interface UpdatePermissionByIdUseCase {
    execute(updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity>;
};

export class UpdatePermissionById implements UpdatePermissionByIdUseCase {

    constructor(private readonly repository: PermissionRepository) { }

    execute(updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
        return this.repository.updateById(updatePermissionDto);
    }

}
