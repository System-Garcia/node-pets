import { PaginationDto } from "../dtos/shared/pagination.dto";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { LoginUserDto } from "../dtos/users/login-user.dto";
import { UpdateUserDto } from "../dtos/users/update-user.dto";
import { UserEntity } from "../entities/user.entity";
import { PaginatedUsersResponse } from "../interfaces";
import { UpdateUserPermissionsDto } from '../dtos/users/update-permissions.dto';
import { UserSearchCriteria } from "../interfaces/user-search-criteria.interface";


export abstract class UserRepository {

    abstract getAll(paginationDto: PaginationDto): Promise<PaginatedUsersResponse>;

    abstract create(createUsertDto: CreateUserDto): Promise<UserEntity>;

    abstract findById(id: number): Promise<UserEntity>;

    abstract deleteById(id: number): Promise<UserEntity>;

    abstract findByEmailAndPassword(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract updateUserById(updateUserDto: UpdateUserDto): Promise<UserEntity>;

    abstract updatePermissionsById(updateUserPermissionsDto: UpdateUserPermissionsDto): Promise<UserEntity>;

    abstract existsByEmailOrPhoneNumber(criteria: UserSearchCriteria): Promise<boolean>;

}