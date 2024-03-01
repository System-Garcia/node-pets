import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { PaginatedUsersResponse } from "../../interfaces";
import { UserRepository } from "../../repositories/user.repository";

interface GetUsersUseCase {
    execute(paginationDto: PaginationDto): Promise<PaginatedUsersResponse>
}

export class GetUsers implements GetUsersUseCase {

    constructor(private readonly repository: UserRepository) {}

    async execute(paginationDto: PaginationDto): Promise<PaginatedUsersResponse> {
        const paginatedUsersResponse = await this.repository.getAll(paginationDto);
        
        const usersWithoutPassword = paginatedUsersResponse.users.map( user => {
            return UserResponseDto.create(user);
        });

        return {
            ...paginatedUsersResponse,
            users: usersWithoutPassword,
        }
    }

};