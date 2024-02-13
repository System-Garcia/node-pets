import { PaginationDto, UserEntity, CreateUserDto, UserDatasource, PaginatedUsersResponse, UpdateUserDto } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/users/login-user.dto";
import { UserRepository } from "../../domain/repositories/user.repository";


export class UserRepositoryImpl implements UserRepository {

    constructor(private userDatasource: UserDatasource) {
        
    }

    getAll(paginationDto: PaginationDto): Promise<PaginatedUsersResponse> {
        return this.userDatasource.getAll(paginationDto);
    }
    create(createUsertDto: CreateUserDto): Promise<UserEntity> {
        return this.userDatasource.create(createUsertDto);
    }
    findById(id: number): Promise<UserEntity> {
        return this.userDatasource.findById(id);
    }
    deleteById(id: number): Promise<UserEntity> {
        return this.userDatasource.deleteById(id);
    }

    findByEmailAndPassword(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.userDatasource.findByEmailAndPassword(loginUserDto);
    }

    updateUserById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userDatasource.updateUserById(updateUserDto);
    }
    
}