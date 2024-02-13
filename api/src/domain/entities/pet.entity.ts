import { CustomError } from "../errors/custom.error";

export interface IPetEntity {
    id: number;
    ownerId: number;
    name: string;
    speciesId: number;
    age: number;
    color: string;
    img: string;
    missingAt: Date;
    createdAt: Date;
    updatedAt: Date;
    locationId: number;
}


export class PetEntity {


    public id: number;
    public ownerId: number;
    public name: string;
    public speciesId: number;
    public age: number;
    public color: string;
    public img: string;
    public missingAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public locationId: number;

    constructor( petData: IPetEntity) {

        const { id, ownerId, name, speciesId, age, color, img, missingAt, createdAt, updatedAt, locationId } = petData;

        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.age = age;
        this.speciesId = speciesId;
        this.color = color;
        this.img = img;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.locationId = locationId
        this.missingAt = missingAt;

    }

    static fromObject(object: {[key: string]:any}): PetEntity {

        const { id, _id, ownerId, name, speciesId, age, color, img, missingAt, createdAt, updatedAt, locationId } = object; 


        if( !id && !_id) throw CustomError.badRequest('Missing pet id');
        if ( !ownerId ) throw CustomError.badRequest('Missing owner id');
        if ( !name ) throw CustomError.badRequest('Missing name');
        if ( !speciesId ) throw CustomError.badRequest('Missing species id');
        if ( !age ) throw CustomError.badRequest('Missing age');
        if ( !color ) throw CustomError.badRequest('Missing color');
        if ( !img ) throw CustomError.badRequest('Missing img');
        if ( !missingAt ) throw CustomError.badRequest('Missing missingAt');
        if ( !createdAt ) throw CustomError.badRequest('Missing createdAt');
        if ( !updatedAt ) throw CustomError.badRequest('Missing updatedAt');
        if ( !locationId ) throw CustomError.badRequest('Missing locationId');

        return new PetEntity({id: id || _id, ownerId, name, speciesId, age, color, img, missingAt, createdAt, updatedAt, locationId})
    }


}