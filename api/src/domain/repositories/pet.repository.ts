import { CreatePetDto } from "../dtos/pets/create-pet.dto";
import { PetEntity } from "../entities/pet.entity";
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { PaginatedPetsResponse } from "../interfaces/paginated-pet-res.interface";
import { UpdatePetDto } from "../dtos/pets/update-pet.dto";


export abstract class PetRepository {

    abstract getAll(pagination: PaginationDto): Promise<PaginatedPetsResponse>;

    abstract create(createPetDto: CreatePetDto): Promise<PetEntity>;

    abstract findById(id: number): Promise<PetEntity>;

    abstract deleteById(id: number): Promise<PetEntity>;

    abstract getUserPets(pagination: PaginationDto, userId: number): Promise<PaginatedPetsResponse>;

    abstract updateById(updatePetDto: UpdatePetDto): Promise<PetEntity>;
}