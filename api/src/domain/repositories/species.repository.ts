import { CreateSpeciesDto } from "../dtos/species/create-species.dto";
import { SpeciesEntity } from "../entities/species.entity";


export abstract class SpeciesRepository {

    abstract create(createSpeciesDto: CreateSpeciesDto): Promise<SpeciesEntity>;
    
    abstract verifySpeciesExistByName(name: string): Promise<boolean>;

    abstract verifySpeciesExist(speciesId: number): Promise<boolean>;

}