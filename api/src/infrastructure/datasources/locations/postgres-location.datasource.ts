import { prisma } from "../../../data/postgres";
import { CreateLocationDto, CustomError, LocationDatasource, LocationEntity, UpdateLocationDto } from "../../../domain";

export class PostgresLocationDatasource implements LocationDatasource {

    async deleteHardById(id: number): Promise<LocationEntity> {
        
        try {
            
            const locationExists = await this.existsById(id);
            if (!locationExists) throw CustomError.notFound(`Location with id ${id} not found`);

            const locationDeleted = await prisma.location.delete({
                where: {
                    id
                }
            });

            return LocationEntity.fromObject(locationDeleted);

        } catch (error) {
            throw error;
        }

    }
    
    async create(createLocationDto: CreateLocationDto): Promise<LocationEntity> {
        
        try {
            const location = await prisma.location.create({
                data: {
                    ...createLocationDto,
                }
            });

            return LocationEntity.fromObject(location);
        } catch (error) {
            throw error;
        }

    }
    
    async update(updateLocationDto: UpdateLocationDto): Promise<LocationEntity> {
        try {

            const locationId = updateLocationDto.id;

            const locationExists = await this.existsById(locationId);
            if (!locationExists) throw CustomError.notFound(`Location with id ${locationId} not found`);

            const locationData = updateLocationDto.values;

            const location = await prisma.location.update({
                where: {
                    id: locationId
                },
                data: {
                    ...locationData
                }
            });

            return LocationEntity.fromObject(location);
        } catch (error) {
            throw error;
        }
    }

    async existsById(id: number): Promise<boolean> {
        try {
            const location = await prisma.location.findUnique({
                where: {
                    id
                }
            });

            return !!location;
        } catch (error) {
            throw error;
        }
    }


}