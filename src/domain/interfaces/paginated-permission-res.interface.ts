import { PermissionEntity } from "../entities/permission.entity";


export interface PaginatedPermissionResponse {
    page: number;
    limit: number;
    total: number;
    next: string | null;
    prev: string | null;
    permissions: PermissionEntity[];
}