export interface IUpdateLocationDto {
    id: number,
    address?: string,
    city?: string,
    country?: string,
    latitude?: number,
    longitude?: number,
    description?: string,
}


export class UpdateLocationDto {

    public id: number;
    public address?: string;
    public city?: string;
    public country?: string;
    public latitude?: number;
    public longitude?: number;
    public description?: string;

    constructor(updateLocationDto: IUpdateLocationDto) {
        const {
            id,
            address,
            city,
            country,
            latitude,
            longitude,
            description
        } = updateLocationDto;

        this.id = id;
        this.address = address;
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.address) returnObj.address = this.address;
        if (this.city) returnObj.city = this.city;
        if (this.country) returnObj.country = this.country;
        if (this.latitude) returnObj.latitude = this.latitude;
        if (this.longitude) returnObj.longitude = this.longitude;
        if (this.description) returnObj.description = this.description;

        return returnObj;
    }

    static create(object: { [key: string]: any }): [string?, UpdateLocationDto?] {
        const { id, address, city, country, latitude, longitude, description } = object;

        if (!id) return ['id must be a valid number'];
        if (isNaN(id)) return ['id must be a valid number'];

        if (address && typeof address !== 'string') return ['Address must be a string'];
        if (address && address.trim().length === 0) return ['Address cannot be empty'];
        if (address && address.trim().length > 255) return ['Address cannot be longer than 255 characters'];

        if (city && typeof city !== 'string') return ['City must be a string'];
        if (city && city.trim().length === 0) return ['City cannot be empty'];
        if (city && city.trim().length > 50) return ['City cannot be longer than 50 characters'];

        if (country && typeof country !== 'string') return ['Country must be a string'];
        if (country && country.trim().length === 0) return ['Country cannot be empty'];
        if (country && country.trim().length > 50) return ['Country cannot be longer than 50 characters'];

        if (latitude && isNaN(latitude)) return ['Latitude must be a valid number'];

        if (longitude && isNaN(longitude)) return ['Longitude must be a valid number'];

        if (description && typeof description !== 'string') return ['Description must be a string'];
        if (description && description.trim().length === 0) return ['Description cannot be empty'];
        if (description && description.trim().length > 255) return ['Description cannot be longer than 255 characters'];


        return [
            undefined,
            new UpdateLocationDto({
                id,
                address,
                city,
                country,
                latitude,
                longitude,
                description
            })
        ];
    }

}