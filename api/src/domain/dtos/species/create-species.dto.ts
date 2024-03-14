interface ICreateSpeciesDto {
    name: string;
}

export class CreateSpeciesDto {

    public name: string;

    private constructor(speciesData: ICreateSpeciesDto) {
        const { name } = speciesData;
        this.name = name;
    }


    static create(object: { [key: string]: any }): [string?, CreateSpeciesDto?] {

        let {
            name
        } = object;

        if (!name) return ["Missing name"];
        name = name.trim().toLowerCase();

        return [undefined, new CreateSpeciesDto({ name })];
    }

}