import { UpdateUserDto } from "../../dtos/users/update-user.dto";
import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

interface UpdateUserUseCase {
    execute(updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
};


export class UpdateUser implements UpdateUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ) {}

    async execute(updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const updatedUser =  await this.repository.updateUserById(updateUserDto);

        return UserResponseDto.create(updatedUser);
    }
}