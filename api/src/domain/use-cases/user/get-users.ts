import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { PaginatedUsersResponse } from "../../interfaces";
import { UserRepository } from "../../repositories/user.repository";

interface GetUsersUseCase {
    execute(paginationDto: PaginationDto): Promise<PaginatedUsersResponse>
}

export class GetUsers implements GetUsersUseCase {

    constructor(private readonly repository: UserRepository) {}

    execute(paginationDto: PaginationDto): Promise<PaginatedUsersResponse> {
        return this.repository.getAll(paginationDto);
    }

};