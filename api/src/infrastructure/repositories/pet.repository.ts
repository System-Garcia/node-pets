import { CreatePetDto, PaginatedPetsResponse, PaginationDto, PetDatasource, PetEntity, PetRepository } from "../../domain";


export class PetRepositoryImpl implements PetRepository {

    constructor(private petDatasource: PetDatasource) { }

    getAll(pagination: PaginationDto): Promise<PaginatedPetsResponse> {
        return this.petDatasource.getAll(pagination);
    }
    create(createPetDto: CreatePetDto): Promise<PetEntity> {
        return this.petDatasource.create(createPetDto);
    }

    async findById(id: number): Promise<PetEntity> {
        return this.petDatasource.findById(id);
    }

    async deleteById(id: number): Promise<PetEntity> {
        return this.petDatasource.deleteById(id);
    }
    
}