import { CreateSpeciesDto } from "../dtos/species/create-species.dto";
import { SpeciesEntity } from "../entities/species.entity";
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { PaginatedSpeciesResponse } from "../interfaces/paginated-species-res.interface";


export abstract class SpeciesDatasource {
    abstract create(createSpeciesDto: CreateSpeciesDto): Promise<SpeciesEntity>;
    
    abstract verifySpeciesExistByName(name: string): Promise<boolean>;

    abstract verifySpeciesExist(speciesId: number): Promise<boolean>;

    abstract getAll(paginationDto: PaginationDto): Promise<PaginatedSpeciesResponse>;
}