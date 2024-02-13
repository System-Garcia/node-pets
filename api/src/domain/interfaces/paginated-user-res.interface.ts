import { UserEntity } from "../entities/user.entity";

export interface PaginatedUsersResponse {
    page: number;
    limit: number;
    total: number;
    next: string | null;
    prev: string | null;
    users: UserEntity[];
}