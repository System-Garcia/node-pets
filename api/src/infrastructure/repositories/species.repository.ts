import { CreateSpeciesDto, PaginationDto, SpeciesDatasource, SpeciesEntity, SpeciesRepository } from "../../domain";
import { PaginatedSpeciesResponse } from "../../domain/interfaces/paginated-species-res.interface";

export class SpeciesRepositoryImpl implements SpeciesRepository {

    constructor(private readonly datasource: SpeciesDatasource) { }

    deleteById(speciesId: number): Promise<SpeciesEntity> {
        return this.datasource.deleteById(speciesId);
    }

    getAll(paginationDto: PaginationDto): Promise<PaginatedSpeciesResponse> {
        return this.datasource.getAll(paginationDto);
    }

    async create(dto: CreateSpeciesDto): Promise<SpeciesEntity> {
        return this.datasource.create(dto);
    }

    verifySpeciesExistByName(name: string): Promise<boolean> {
        return this.datasource.verifySpeciesExistByName(name);
    }
    verifySpeciesExist(speciesId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}