import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { PaginatedPermissionResponse } from "../../interfaces";
import { PermissionRepository } from "../../repositories/permission.repository";

interface GetPermissionUseCase {
    execute(paginationDto: PaginationDto): Promise<PaginatedPermissionResponse>;
};

export class GetPermissions implements GetPermissionUseCase {

    constructor(private readonly repository: PermissionRepository) { }

    execute(paginationDto: PaginationDto): Promise<PaginatedPermissionResponse> {
        return this.repository.getAll(paginationDto);
    }

}