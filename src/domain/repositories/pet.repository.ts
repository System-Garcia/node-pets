import { CreatePetDto } from "../dtos/pets/create-pet.dto";
import { PetEntity } from "../entities/pet.entity";


export abstract class PetRepository {

    //todo: paginacion
    abstract getAll(): Promise<PetEntity[]>;

    abstract create(createPetDto: CreatePetDto): Promise<PetEntity>;

    abstract findById(id: number): Promise<PetEntity>;

    abstract deleteById(id: string): Promise<PetEntity>;
}