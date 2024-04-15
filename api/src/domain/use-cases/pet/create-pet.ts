import { CreatePetDto } from "../../dtos/pets/create-pet.dto";
import { PetEntity } from "../../entities/pet.entity";
import { PetRepository } from "../../repositories/pet.repository";

export interface CreatePetUseCase {
    execute(createPetDto: CreatePetDto): Promise<PetEntity>;
}

export class CreatePet implements CreatePetUseCase {
    constructor( private readonly repoitory: PetRepository ) {}

    async execute(createPetDto: CreatePetDto): Promise<PetEntity> {
        return this.repoitory.create(createPetDto);
    }
}