import { CreateLocationDto } from "../dtos/locations/create-location.dto";
import { UpdateLocationDto } from "../dtos/locations/update-location.dto";
import { LocationEntity } from "../entities/location.entity";


export abstract class LocationRepository {
    abstract create(createLocationDto: CreateLocationDto): Promise<LocationEntity>;
    abstract update(updateLocationDto: UpdateLocationDto): Promise<LocationEntity>;
    abstract deleteHardById(id: number): Promise<LocationEntity>;
}