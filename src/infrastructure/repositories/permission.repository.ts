import { PaginationDto } from "../../domain";
import { PermissionDatasource } from "../../domain/datasources/permission.datasource";
import { CreatePermissionDto } from "../../domain/dtos/permissions/create-permission.dto";
import { UpdatePermissionDto } from "../../domain/dtos/permissions/update-permission.dto";
import { PermissionEntity } from "../../domain/entities/permission.entity";
import { PaginatedPermissionResponse } from "../../domain/interfaces/paginated-permission-res.interface";
import { PermissionRepository } from "../../domain/repositories/permission.repository";



export class PermissionRepositoryImpl implements PermissionRepository {

    constructor(private readonly datasoruce: PermissionDatasource) { }

    create(createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
        return this.datasoruce.create(createPermissionDto);
    }
    getAll(paginationDto: PaginationDto): Promise<PaginatedPermissionResponse[]> {
        return this.datasoruce.getAll(paginationDto);
    }
    findById(id: number): Promise<PermissionEntity> {
        return this.datasoruce.findById(id);
    }
    updateById(updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
        return this.datasoruce.updateById(updatePermissionDto);
    }
    deleteById(id: number): Promise<PermissionEntity> {
        return this.datasoruce.deleteById(id);
    }

    verifyPermissionExist(permissionId: number): Promise<boolean> {
        return this.datasoruce.verifyPermissionExist(permissionId);
    }

}