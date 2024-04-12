import { PetEntity } from "../../entities/pet.entity";
import { PetRepository } from "../../repositories/pet.repository";

export interface DeletePetUseCase {
    execute(petId: number): Promise<PetEntity>;
};


export class DeletePet implements DeletePetUseCase {
    
    constructor(
        private petRepository: PetRepository
    ) {}

    async execute(petId: number): Promise<PetEntity> {
        return this.petRepository.deleteById(petId);
    }
}