import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { PaginatedSpeciesResponse } from "../../interfaces/paginated-species-res.interface";
import { SpeciesRepository } from "../../repositories/species.repository";

export interface GetSpeciesUseCase {
    execute(paginationDto: PaginationDto): Promise<PaginatedSpeciesResponse>
}

export class GetSpecies implements GetSpeciesUseCase {

    constructor(private readonly repository: SpeciesRepository) {}

    execute(paginationDto: PaginationDto): Promise<PaginatedSpeciesResponse> {
        return this.repository.getAll(paginationDto);
    }
}