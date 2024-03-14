import { prisma } from "../../../data/postgres";
import { CreateSpeciesDto, CustomError, SpeciesDatasource, SpeciesEntity } from "../../../domain";

export class PostgresSpeciesDatasourceImpl implements SpeciesDatasource {
    
    async create(createSpeciesDto: CreateSpeciesDto): Promise<SpeciesEntity> {
        
        const { name } = createSpeciesDto;

        const speciesExists = await this.verifySpeciesExistByName(name);
        if (speciesExists) throw CustomError.conflict('Species already exists');

        const species = await prisma.species.create({
            data: { name }
        });

        return SpeciesEntity.fromObject(species);
    }

    async verifySpeciesExistByName(name: string): Promise<boolean> {
        
        const species = await prisma.species.findFirst(
            { where: { name,isDeleted: false } }
        );

        return !!species;
    }
    verifySpeciesExist(speciesId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
   
}