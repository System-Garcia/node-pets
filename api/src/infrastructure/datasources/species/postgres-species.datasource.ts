import { prisma } from "../../../data/postgres";
import { CreateSpeciesDto, CustomError, PaginationDto, SpeciesDatasource, SpeciesEntity } from "../../../domain";
import { PaginatedSpeciesResponse } from "../../../domain/interfaces/paginated-species-res.interface";

export class PostgresSpeciesDatasourceImpl implements SpeciesDatasource {
    
    constructor(private readonly webServiceUrl: string) {}

    async deleteById(speciesId: number): Promise<SpeciesEntity> {
        
        const speciesExists = await this.verifySpeciesExist(speciesId);
        if (!speciesExists) throw CustomError.notFound(`Species with id ${speciesId} not found`);

        const deletedSpecies = await prisma.species.update({
            where: { id: speciesId },
            data: { isDeleted: true }
        });

        return SpeciesEntity.fromObject(deletedSpecies);
    }

    async getAll(paginationDto: PaginationDto): Promise<PaginatedSpeciesResponse> {
        const { page, limit } = paginationDto;

        try {
            const skip = (page - 1) * limit;
      
            const [total, species] = await Promise.all([
              prisma.species.count(),
              prisma.species.findMany({
                where: { isDeleted: false },
                skip: skip,
                take: limit,
              }),
            ]);

            const nextPage =
            (page * limit) >= total
              ? null
              : `${this.webServiceUrl}/species?page=${page + 1}&limit=${limit}`;
    
            const prevPage =
                (page - 1) > 0 ? `${this.webServiceUrl}/species?page=${page - 1}&limit=${limit}` : null;
        
            return {
                page,
                limit,
                total,
                next: nextPage,
                prev: prevPage,
                species: species.map((species) => SpeciesEntity.fromObject(species)),
            };

        } catch (error) {
            throw error;
        }   

    
    }

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

    async verifySpeciesExist(speciesId: number): Promise<boolean> {
        
        const species = await prisma.species.findFirst(
            { where: { id: speciesId, isDeleted: false } }
        );

        return !!species;
    }
   
}