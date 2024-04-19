export interface ICreateLocationDto {
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    description: string;
}

export class CreateLocationDto {
    public address: string;
    public city: string;
    public country: string;
    public latitude: number;
    public longitude: number;
    public description: string;

    constructor(createLocationDto: ICreateLocationDto) {
        const { address, city, country, latitude, longitude, description } = createLocationDto;

        this.address = address;
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }

    static create(object: { [key: string]: any }): [string?, CreateLocationDto?] {
        let { address, city, country, latitude, longitude, description } = object;

        if (!address) return ["Missing address"];
        if (typeof address !== "string") return ["Address must be a string"];
        if (address.trim().length === 0) return ["Address cannot be empty"];
        if (address.trim().length > 255) return ["Address cannot be longer than 255 characters"];


        if (!city) return ["Missing city"];
        if (typeof city !== "string") return ["City must be a string"];
        if (city.trim().length === 0) return ["City cannot be empty"];
        if (city.trim().length > 50) return ["City cannot be longer than 50 characters"];

        if (!country) return ["Missing country"];
        if (typeof country !== "string") return ["Country must be a string"];
        if (country.trim().length === 0) return ["Country cannot be empty"];
        if (country.trim().length > 50) return ["Country cannot be longer than 50 characters"];

        if (!latitude) return ["Missing latitude"];
        if (isNaN(latitude)) return ["Latitude must be a valid number"];

        latitude = parseFloat(latitude);

        if (!longitude) return ["Missing longitude"];
        if (isNaN(longitude)) return ["Longitude must be a valid number"];

        longitude = parseFloat(longitude);


        if (!description) return ["Missing description"];
        if (typeof description !== "string") return ["Description must be a string"];
        if (description.trim().length === 0) return ["Description cannot be empty"];
        if (description.trim().length > 255) return ["Description cannot be longer than 255 characters"];
        

        return [
            undefined,
            new CreateLocationDto({ address, city, country, latitude, longitude, description })
        ];
    }
}