import { CreateSpeciesDto, SpeciesDatasource, SpeciesEntity, SpeciesRepository } from "../../domain";

export class SpeciesRepositoryImpl implements SpeciesRepository {

    constructor(private readonly datasource: SpeciesDatasource) { }

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