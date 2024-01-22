import { CreatePermissionDto } from "../dtos/permissions/create-permission.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { PermissionEntity } from "../entities/permission.entity";
import { UpdatePermissionDto } from '../dtos/permissions/update-permission.dto';
import { PaginatedPermissionResponse } from "../interfaces/paginated-permission-res.interface";

export abstract class PermissionDatasource {

    abstract create(createPermissionDto: CreatePermissionDto): Promise<PermissionEntity>;
    
    abstract getAll(paginationDto: PaginationDto): Promise<PaginatedPermissionResponse[]>;

    abstract findById(id: number): Promise<PermissionEntity>;

    abstract updateById(updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity>

    abstract deleteById(id: number): Promise<PermissionEntity>;
}