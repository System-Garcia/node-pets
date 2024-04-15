import { SpeciesEntity } from '../../entities/species.entity';
import { SpeciesRepository } from '../../repositories/species.repository';

export interface DeleteSpeciesUseCase {
    execute(id: number): Promise<SpeciesEntity>;
}

export class DeleteSpecies implements DeleteSpeciesUseCase {
    
        constructor(private readonly repository: SpeciesRepository) {}
    
        execute(id: number): Promise<SpeciesEntity> {
            return this.repository.deleteById(id);
        };
}