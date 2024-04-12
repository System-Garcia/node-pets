import { UpdatePetDto } from "../../dtos/pets/update-pet.dto";
import { PetEntity } from "../../entities/pet.entity";
import { PetRepository } from "../../repositories/pet.repository";

export interface UpdatePetUseCase {
    execute(updatePetDto: UpdatePetDto): Promise<PetEntity>
};

export class UpdatePet implements UpdatePetUseCase {

    constructor(private petRepository: PetRepository) { }

    async execute(updatePetDto: UpdatePetDto): Promise<PetEntity> {
        return this.petRepository.updateById(updatePetDto);
    }
}