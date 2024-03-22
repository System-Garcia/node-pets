import { PaginationDto } from '../../dtos/shared/pagination.dto';
import { PaginatedPetsResponse } from '../../interfaces/paginated-pet-res.interface';
import { PetRepository } from '../../repositories/pet.repository';

export interface GetUserPetsUseCase {
    execute(paginationDto: PaginationDto, userId: number): Promise<PaginatedPetsResponse>
};


export class GetUserPets implements GetUserPetsUseCase {

    constructor(private readonly petRepository: PetRepository) {}

    public async execute(paginationDto: PaginationDto, userId: number): Promise<PaginatedPetsResponse> {
        return this.petRepository.getUserPets(paginationDto, userId);
    }

}