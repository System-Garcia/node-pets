export interface IUpdateSpeciesDto {
    id: number;
    name?: string;
}

export class UpdateSpeciesDto {

    public readonly id;
    public readonly name;

    private constructor(speciesProps: IUpdateSpeciesDto) {
        this.id = speciesProps.id;
        this.name = speciesProps.name;
    }

    get values() {

        const returnObj: {[key: string]: any} = {};

        if(this.name) returnObj.name = this.name;

        return returnObj;
    }


    static create(props: {[key: string]: any}): [string?, UpdateSpeciesDto?] {
        
        let { 
            id, 
            name,
        } = props;
        
        if( !id ) return ['id is required'];
        if( isNaN(id)) return ['id must be a valid number'];

        if ( name && typeof name !== 'string') return ['name must be a string'];
        if ( name ) {
            name = name.trim().toLowerCase();
        }

        return [undefined, new UpdateSpeciesDto({ id, name })];
    }

}