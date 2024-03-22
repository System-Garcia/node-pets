import { prisma } from "../../../data/postgres";
import { CreatePetDto, CustomError, PaginatedPetsResponse, PaginationDto, PetDatasource, PetEntity, UpdatePetDto } from "../../../domain";


export class PostgresPetDatasourceImpl implements PetDatasource {

    constructor(
        private readonly webServiceUrl: string,
    ) {}

    async create(createPetDto: CreatePetDto): Promise<PetEntity> {
        
        try {
            const { ownerId, name, speciesId, color, img, missingAt } = createPetDto;
        
            const newPet = await prisma.pet.create({
                data: {
                    ownerId,
                    name,
                    speciesId,
                    color,
                    img,
                    missingAt,
                },
            });

            return PetEntity.fromObject(newPet);
            
        } catch (error) {
            throw error;
        }
    };

    async getAll(pagination: PaginationDto): Promise<PaginatedPetsResponse> {

        const { page, limit } = pagination;

        try {
            const skip = (page - 1) * limit;

            const [total, pets] = await Promise.all([
                prisma.pet.count(),
                prisma.pet.findMany({
                where: { isDeleted: false },
                skip: skip,
                take: limit,
                }),
            ]);
            
            const nextPage =
                (page * limit) >= total
                ? null
                : `${this.webServiceUrl}/pets?page=${page + 1}&limit=${limit}`;

            const prevPage =
                (page - 1) > 0 ? `${this.webServiceUrl}/pets?page=${page - 1}&limit=${limit}` : null;
            
            return {
                page,
                limit,
                total,
                next: nextPage,
                prev: prevPage,
                pets: pets.map((pet) => PetEntity.fromObject(pet)),
            };
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<PetEntity> {
        
        try {
            const pet = await prisma.pet.findUnique({
                where: { id, isDeleted: false },
            });
    
            if (!pet) throw CustomError.notFound(`Pet with id ${id} not found`);
    
    
            return PetEntity.fromObject(pet);
        } catch (error) {
            throw error;
        }
    }

    updateById(updatePetDto: UpdatePetDto): Promise<PetEntity> {
        throw new Error("Method not implemented.");
    }

    async deleteById(id: number): Promise<PetEntity> {
        
        try {
            await this.findById(id);

            const deletedPet = await prisma.pet.update({
                where: { id },
                data: { isDeleted: true },
            });

            return PetEntity.fromObject(deletedPet);
            
        } catch (error) {
            throw error;
        }
    }

}