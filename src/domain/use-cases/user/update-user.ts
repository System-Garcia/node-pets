import { UpdateUserDto } from "../../dtos/users/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

interface UpdateUserUseCase {
    execute(updateUserDto: UpdateUserDto): Promise<UserEntity>;
};


export class UpdateUser implements UpdateUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ) {}

    async execute(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return await this.repository.updateUserById(updateUserDto);
    }
}