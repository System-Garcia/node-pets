import { UpdateUserPermissionsDto } from "../../dtos/users/update-permissions.dto";
import { UpdateUserDto } from "../../dtos/users/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

interface UpdatePermissionsUserUseCase {
    execute(updateUserPermissionsDto: UpdateUserPermissionsDto): Promise<UserEntity>;
};


export class UpdatePermissionsUser implements UpdatePermissionsUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ) {}

    async execute(updateUserPermissionsDto: UpdateUserPermissionsDto): Promise<UserEntity> {
        return await this.repository.updatePermissionsById(updateUserPermissionsDto);
    }
}