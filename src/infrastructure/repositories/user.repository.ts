import { PaginationDto, UserEntity, CreateUserDto, UserDatasource, PaginatedUsersResponse } from "../../domain";
import { UserRepository } from "../../domain/repositories/user.repository";


export class UserRepositoryImp implements UserRepository {

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
    
}