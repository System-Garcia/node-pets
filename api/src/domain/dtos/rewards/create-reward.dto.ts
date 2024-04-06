
export interface ICreateRewardDto {
    amount: number,
    description: string,
    petId: number,
    locationId: number,
};


export class CreateRewardDto {

    public amount: number;
    public description: string;
    public petId: number;
    public locationId: number;

    constructor(rewardData: ICreateRewardDto) {
        this.amount = rewardData.amount;
        this.description = rewardData.description;
        this.petId = rewardData.petId;
        this.locationId = rewardData.locationId;
    };

    static create(object: { [key: string]: any }): [string?, CreateRewardDto?] {
            
            const { amount, description, petId, locationId } = object;
    
            if (!amount) return ['Missing amount'];
            if (isNaN(amount)) return ['amount must be a valid number'];
    
            if (!description) return ['Missing description'];
            if (typeof description !== 'string') return ['Description must be a string'];
            if (description.trim().length < 20 || description.trim().length > 200) return ['Description must be between 20 and 200 characters'];
    
            if (!petId) return ['Missing pet id'];
            if (isNaN(petId)) return ['Pet id must be a valid number'];
    
            if (!locationId) return ['Missing location id'];
            if (isNaN(locationId)) return ['Location id must be a valid number'];
    
            return [
                undefined,
                new CreateRewardDto({ amount, description, petId, locationId })
            ]
        }

}