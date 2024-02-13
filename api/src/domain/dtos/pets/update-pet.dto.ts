
/**
 * Represents the data transfer object for updating a pet.
 * This class includes optional fields that can be updated, and it utilizes a static factory method for instantiation.
 */
export class UpdatePetDto {

    /**
     * Constructs a new UpdatePetDto instance.
     * @param id The unique identifier of the pet. Must be provided.
     * @param name The name of the pet. Optional for updates.
     * @param speciesId The ID of the pet's species. Optional for updates.
     * @param color The color of the pet. Optional for updates.
     * @param img A URL link to an image of the pet. Optional for updates.
     * @param missingAt The date and time when the pet was reported missing. Optional for updates.
     */
    private constructor(
        public id: number,
        public name?: string,
        public speciesId?: number,
        public color?: string,
        public img?: string,
        public missingAt?: Date,
    ){}

     /**
     * Getter to extract only the provided fields in the UpdatePetDto object.
     * This method is useful for partial updates where only a subset of information is being modified.
     * @returns An object containing only the fields that have been set.
     */
    get values() { 

        const returnObj: {[key: string]:any} = {};

        if(this.name) returnObj.name = this.name;
        if(this.speciesId) returnObj.speciesId = this.speciesId;
        if(this.color) returnObj.color = this.color;
        if(this.img) returnObj.img = this.img;
        if(this.missingAt) returnObj.missingAt = this.missingAt;

        return returnObj;
    }

    /**
     * Factory method to create a new instance of UpdatePetDto with validations.
     * Validates the input object and returns an error message and undefined if the validation fails, 
     * or undefined and a new instance of UpdatePetDto if validation is successful.
     * @param object The object containing update data for the pet.
     * @returns A tuple containing an error message (if any) and an instance of UpdatePetDto.
     */
    static create(object: { [key: string]: any }): [string?, UpdatePetDto?] {

        const { id, name, speciesId, color, img, missingAt } = object; 

        if(!id || isNaN(id)) {
            return ['id must be a valid number']
        };

        let newMissingAt =  missingAt;

        if(missingAt) {
            newMissingAt = new Date(missingAt);

            if(newMissingAt.toString() === 'Invalid Date') {
                return ['MissingAt must be a valid Date']
            }
        };


        return [undefined, new UpdatePetDto(id, name, speciesId, color, img, missingAt)]
    }

}