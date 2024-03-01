import { UserResponseDto } from "../dtos/users/user-response.dto";

export interface PaginatedUsersResponse {
    page: number;
    limit: number;
    total: number;
    next: string | null;
    prev: string | null;
    users: UserResponseDto[];
}