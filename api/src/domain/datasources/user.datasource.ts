import { PaginationDto } from "../dtos/shared/pagination.dto";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { LoginUserDto } from "../dtos/users/login-user.dto";
import { UpdateUserPermissionsDto } from "../dtos/users/update-permissions.dto";
import { UpdateUserDto } from "../dtos/users/update-user.dto";
import { UserEntity } from "../entities/user.entity";
import { PaginatedUsersResponse } from "../interfaces";
import { UserSearchCriteria } from "../interfaces/user-search-criteria.interface";


export abstract class UserDatasource {

    abstract getAll(pagination: PaginationDto): Promise<PaginatedUsersResponse>;

    abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;

    abstract findById(id: number): Promise<UserEntity>;

    abstract deleteById(id: number): Promise<UserEntity>;

    abstract findByEmailAndPassword(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract updateUserById(updateUserDto: UpdateUserDto): Promise<UserEntity>;

    abstract updatePermissionsById(updateUserPermissionsDto: UpdateUserPermissionsDto): Promise<UserEntity>;

    abstract existsByEmailOrPhoneNumber(criteria: UserSearchCriteria): Promise<boolean>;

    abstract findByEmail(email: string): Promise<UserEntity>;

    abstract validateUserEmail(Id: number): Promise<UserEntity>;

}