import { CreateSpeciesDto } from "../../dtos/species/create-species.dto";
import { SpeciesEntity } from "../../entities/species.entity";
import { SpeciesRepository } from "../../repositories/species.repository";

export interface CreateSpeciesUseCase {
    execute(dto: CreateSpeciesDto): Promise<SpeciesEntity>
}

export class CreateSpecies implements CreateSpeciesUseCase {

    constructor(private readonly repository: SpeciesRepository) {}

    async execute(dto: CreateSpeciesDto): Promise<SpeciesEntity> {
        return this.repository.create(dto);
    }

}
