import { UpdateUserPermissionsDto } from "../../dtos/users/update-permissions.dto";
import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { UserRepository } from "../../repositories/user.repository";

interface UpdatePermissionsUserUseCase {
    execute(updateUserPermissionsDto: UpdateUserPermissionsDto): Promise<UserResponseDto>;
};


export class UpdatePermissionsUser implements UpdatePermissionsUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ) {}

    async execute(updateUserPermissionsDto: UpdateUserPermissionsDto): Promise<UserResponseDto> {
        const updatedUser = await this.repository.updatePermissionsById(updateUserPermissionsDto);

        return UserResponseDto.create(updatedUser);
    }
}