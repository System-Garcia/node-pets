import { UpdateSpeciesDto } from "../../dtos/species/update-species.dto";
import { SpeciesEntity } from "../../entities/species.entity";
import { SpeciesRepository } from "../../repositories/species.repository";

export interface UpdateSpeciesUseCase {
    execute(updateSpeciesDto: UpdateSpeciesDto): Promise<SpeciesEntity>;
};

export class UpdateSpecies implements UpdateSpeciesUseCase {

    constructor(private readonly repository: SpeciesRepository) { }

    execute(updateSpeciesDto: UpdateSpeciesDto): Promise<SpeciesEntity> {
        return this.repository.update(updateSpeciesDto);
    }

}