

export class UpdateRewardDto {

    private constructor(
        public id: number,
        public amount?: number,
        public description?: string,
        public petId?: number,
        public locationId?: number,
    ){}
        
    get values() { 

        const returnObj: {[key: string]:any} = {};

        if(this.amount) returnObj.amount = this.amount;
        if(this.description) returnObj.description = this.description;
        if(this.petId) returnObj.petId = this.petId;
        if(this.locationId) returnObj.locationId = this.locationId;

        return returnObj;
    }

    static create(object: { [key: string]: any }): [string?, UpdateRewardDto?] {

        const { id, amount, description, petId, locationId } = object; 

        if(!id || isNaN(id)) return ['id must be a valid number']
        
        if(amount && isNaN(amount)) return ['amount must be a valid number'];
        if(amount && amount < 0) return ['amount cannot be negative'];
        
        if(description && typeof description !== 'string') return ['Description must be a string'];
        if(description && description.trim().length < 20) return ['Description must be at least 20 characters'];
        if(description && description.trim().length > 200) return ['Description cannot be longer than 200 characters'];
        
        if(petId && isNaN(petId)) return ['petId must be a valid number']
        
        if(locationId && isNaN(locationId)) return ['locationId must be a valid number']
        
        return [undefined, new UpdateRewardDto(id, amount, description, petId, locationId)];
    }
}