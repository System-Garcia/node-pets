import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { UserRepository } from "../../repositories/user.repository";

interface GetUserUseCase {
    execute(id: number): Promise<UserResponseDto>
};


export class GetUser implements GetUserUseCase {

    constructor(private readonly repository: UserRepository) { }

    async execute(id: number): Promise<UserResponseDto> {
        const user = await this.repository.findById(id);

        return UserResponseDto.create(user)
    };

}