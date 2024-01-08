import { PetEntity } from "../entities/pet.entity";
import { CreatePetDto } from '../dtos/pets/create-pet.dto';
import { UpdatePetDto } from "../dtos/pets/update-pet.dto";


export abstract class PetDatasource {

    abstract create(createPetDto:CreatePetDto): Promise<PetEntity>

    //TODO: Implementar paginacion
    abstract getAll(): Promise<PetEntity[]>;
    abstract findById(id: number): Promise<PetEntity>;
    abstract updateById(updatePetDto: UpdatePetDto): Promise<PetEntity>;
    abstract deleteById(id: number): Promise<PetEntity>;
}