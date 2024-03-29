import { CreatePetDto } from "../dtos/pets/create-pet.dto";
import { PetEntity } from "../entities/pet.entity";
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { PaginatedPetsResponse } from "../interfaces/paginated-pet-res.interface";


export abstract class PetRepository {

    abstract getAll(pagination: PaginationDto): Promise<PaginatedPetsResponse>;

    abstract create(createPetDto: CreatePetDto): Promise<PetEntity>;

    abstract findById(id: number): Promise<PetEntity>;

    abstract deleteById(id: string): Promise<PetEntity>;
}