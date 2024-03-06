import { LoginUserDto } from "../../dtos/users/login-user.dto";
import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserResponseDto>
}

export class LoginUser implements LoginUserUseCase{

    constructor(private readonly repository: UserRepository) {}

    async execute(dto: LoginUserDto): Promise<UserResponseDto> {
        const user = await this.repository.findByEmailAndPassword(dto);

        if(!user.emailValidated) {
            throw CustomError.forbidden('Email not validated');
        }

        return UserResponseDto.create(user);
    }

}