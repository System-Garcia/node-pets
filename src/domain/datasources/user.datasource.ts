import { PaginationDto } from "../dtos/shared/pagination.dto";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { LoginUserDto } from "../dtos/users/login-user.dto";
import { UpdateUserDto } from "../dtos/users/update-user.dto";
import { UserEntity } from "../entities/user.entity";
import { PaginatedUsersResponse } from "../interfaces";


export abstract class UserDatasource {

    abstract getAll(pagination: PaginationDto): Promise<PaginatedUsersResponse>;

    abstract create(createPetDto: CreateUserDto): Promise<UserEntity>;

    abstract findById(id: number): Promise<UserEntity>;

    abstract deleteById(id: number): Promise<UserEntity>;

    abstract findByEmailAndPassword(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract updateUserById(updateUserDto: UpdateUserDto): Promise<UserEntity>;
}