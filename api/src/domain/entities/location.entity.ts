export interface ILocationEntity {
    id: number;
    address: string;
    city: string;
    country: string; 
    latitude: number;
    longitude: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}


export class LocationEntity {

    public id: number;
    public address: string;
    public city: string;
    public country: string;
    public createdAt: Date;
    public updatedAt: Date;
    public latitude: number;
    public longitude: number;
    public description: string;

    constructor(locationData: ILocationEntity) {
       
        this.id = locationData.id;
        this.address = locationData.address;
        this.city = locationData.city;
        this.country = locationData.country;
        this.createdAt = locationData.createdAt;
        this.updatedAt = locationData.updatedAt;
        this.latitude = locationData.latitude;
        this.longitude = locationData.longitude;
        this.description = locationData.description;
    };

    static fromObject(object: {[key: string]:any}): LocationEntity {
        const {
            id, 
            _id, 
            address, 
            city, country, 
            createdAt, 
            updatedAt,
            latitude,
            longitude,
            description,
        } = object;

        if (!id && !_id) throw new Error('Missing location id');
        if (!address) throw new Error('Missing address');
        if (!city) throw new Error('Missing city');
        if (!country) throw new Error('Missing country');
        if (!createdAt) throw new Error('Missing createdAt');
        if (!updatedAt) throw new Error('Missing updatedAt');
        if (!latitude) throw new Error('Missing latitude');
        if (isNaN(latitude)) throw new Error('Latitude must be a valid number');
        if (!longitude) throw new Error('Missing longitude');
        if (isNaN(longitude)) throw new Error('Longitude must be a valid number');
        if (!description) throw new Error('Missing description');


        return new LocationEntity({
            id: id || _id,
            address,
            city,
            country,
            latitude,
            longitude,
            description,
            createdAt,
            updatedAt,
        });
    }
}