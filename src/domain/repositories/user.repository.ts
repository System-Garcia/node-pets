import { PaginationDto } from "../dtos/shared/pagination.dto";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { PaginatedUsersResponse } from "../interfaces";


export abstract class UserRepository {

    abstract getAll(paginationDto: PaginationDto): Promise<PaginatedUsersResponse>;

    abstract create(createUsertDto: CreateUserDto): Promise<UserEntity>;

    abstract findById(id: number): Promise<UserEntity>;

    abstract deleteById(id: number): Promise<UserEntity>;
}