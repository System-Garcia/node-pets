import { CreateSpeciesDto, PaginationDto, SpeciesDatasource, SpeciesEntity, SpeciesRepository } from "../../domain";
import { UpdateSpeciesDto } from "../../domain/dtos/species/update-species.dto";
import { PaginatedSpeciesResponse } from "../../domain/interfaces/paginated-species-res.interface";

export class SpeciesRepositoryImpl implements SpeciesRepository {

    constructor(private readonly datasource: SpeciesDatasource) { }

    update(updateSpeciesDto: UpdateSpeciesDto): Promise<SpeciesEntity> {
        return this.datasource.update(updateSpeciesDto);
    }

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