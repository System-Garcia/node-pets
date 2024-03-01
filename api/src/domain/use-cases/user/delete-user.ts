import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { UserRepository } from "../../repositories/user.repository";

export interface DeleteUserUseCase {
    execute(id: number): Promise<UserResponseDto>
}

export class DeleteUser implements DeleteUserUseCase{

    constructor(private readonly repository: UserRepository) {}

    async execute(id: number): Promise<UserResponseDto> {  
        const user = await this.repository.deleteById(id);

        return UserResponseDto.create(user);
    };

}