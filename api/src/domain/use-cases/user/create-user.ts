import { CreateUserDto } from "../../dtos/users/create-user.dto";
import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { UserRepository } from "../../repositories/user.repository";


export interface CreateUserUseCase {
    execute(dto: CreateUserDto): Promise<UserResponseDto>
}

export class CreateUser implements CreateUserUseCase{

    constructor(private readonly repository: UserRepository) { }

    async execute(dto: CreateUserDto): Promise<UserResponseDto> {
        
        const userEntity = await this.repository.create(dto);

        return UserResponseDto.create(userEntity);
    };

}