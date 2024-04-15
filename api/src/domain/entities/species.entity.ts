import { CustomError } from "../errors/custom.error";

interface ISpeciesEntity {
    id: number;
    name: string;
}

export class SpeciesEntity {

    public id: number;
    public name: string;

    constructor(speciesData: ISpeciesEntity) {
        const { id, name } = speciesData;

        this.id = id;
        this.name = name;
    };


    static fromObject(object: { [key: string]: any }): SpeciesEntity {
            
            const { id, _id, name } = object;
    
            if (!id && !_id) throw CustomError.badRequest('Missing species id');
            if (!name) throw CustomError.badRequest('Missing name');
    
            return new SpeciesEntity({ id: id || _id, name });
        }

}