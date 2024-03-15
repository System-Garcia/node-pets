import { CreatePetDto, PaginatedPetsResponse, PaginationDto, PetDatasource, PetEntity, PetRepository } from "../../domain";


export class PetRepositoryImpl implements PetRepository {

    constructor(private petDatasource: PetDatasource) { }

    getAll(pagination: PaginationDto): Promise<PaginatedPetsResponse> {
        return this.petDatasource.getAll(pagination);
    }
    create(createPetDto: CreatePetDto): Promise<PetEntity> {
        return this.petDatasource.create(createPetDto);
    }
    findById(id: number): Promise<PetEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<PetEntity> {
        throw new Error("Method not implemented.");
    }
    
}