import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { PaginatedPetsResponse } from "../../interfaces/paginated-pet-res.interface";
import { PetRepository } from "../../repositories/pet.repository";

interface GetPetsUseCase {
    execute(paginationDto: PaginationDto): Promise<PaginatedPetsResponse>,
};

export class GetPets implements GetPetsUseCase {

    constructor(private petRepository: PetRepository) { }

    execute(paginationDto: PaginationDto): Promise<PaginatedPetsResponse> {
        return this.petRepository.getAll(paginationDto);
    };

} 