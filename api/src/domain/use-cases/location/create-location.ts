import { CreateLocationDto } from "../../dtos/locations/create-location.dto";
import { LocationEntity } from "../../entities/location.entity";
import { LocationRepository } from "../../repositories/location.repository";

export interface CreateLocationUseCase {
    execute(createLocationDto: CreateLocationDto): Promise<LocationEntity>;
};

export class CreateLocation {

    constructor(private locationRepository: LocationRepository) {}

    async execute(createLocationDto: CreateLocationDto): Promise<LocationEntity> {
        return this.locationRepository.create(createLocationDto);
    }
}