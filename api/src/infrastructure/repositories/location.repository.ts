import { CreateLocationDto, LocationDatasource, LocationEntity, LocationRepository, UpdateLocationDto } from "../../domain";


export class LocationRepositoryImpl implements LocationRepository {
    
    constructor(
        private readonly datasource: LocationDatasource,
    ) {}

    async create(createLocationDto: CreateLocationDto): Promise<LocationEntity> {
        return this.datasource.create(createLocationDto);
    }
    
    async update(updateLocationDto: UpdateLocationDto): Promise<LocationEntity> {
        return this.datasource.update(updateLocationDto);
    }

    async deleteHardById(id: number): Promise<LocationEntity> {
        return this.datasource.deleteHardById(id);
    }

}