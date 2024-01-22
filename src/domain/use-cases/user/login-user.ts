import { LoginUserDto } from "../../dtos/users/login-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserEntity>
}

export class LoginUser implements LoginUserUseCase{

    constructor(private readonly repository: UserRepository) {}

    execute(dto: LoginUserDto): Promise<UserEntity> {
        return this.repository.findByEmailAndPassword(dto);
    }

}