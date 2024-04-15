import { CommentEntity } from "./comment.entity";
import { LocationEntity } from "./location.entity";
import { PetEntity } from "./pet.entity";

export interface IRewardEntity {
    id: number;
    amount: number;
    description: string;
    pet: PetEntity;
    createdAt: Date;
    updatedAt: Date;
    comments: CommentEntity[];
    location: LocationEntity;
}

export class RewardEntity {
    public id: number;
    public amount: number;
    public description: string;
    public pet: PetEntity;
    public createdAt: Date;
    public updatedAt: Date;
    public comments: CommentEntity[];
    public location: LocationEntity;

    constructor(rewardData: IRewardEntity) {
        const {
        id,
        amount,
        description,
        pet,
        comments,
        createdAt,
        location,
        updatedAt,
        } = rewardData;

        this.id = id;
        this.amount = amount;
        this.description = description;
        this.pet = pet;
        this.comments = comments;
        this.createdAt = createdAt;
        this.location = location;
        this.updatedAt = updatedAt;
    }

    static fromObject(object: { [key: string]: any }): RewardEntity {
        const { id, _id, amount, description, pet, createdAt, updatedAt, location, comments } = object;

        if (!id && _id) throw new Error("Missing reward id");

        if (id && isNaN(id)) throw new Error("Reward id must be a valid number");
        if (_id && isNaN(_id)) throw new Error("Reward id must be a valid number");

        if (!amount) throw new Error("Missing amount");
        if (isNaN(amount)) throw new Error("amount must be a valid number");

        if (!description) throw new Error("Missing description");
        if (typeof description !== "string") throw new Error("Description must be a string");
        if (description.trim().length < 20 || description.trim().length > 200) throw new Error("Description must be between 20 and 200 characters");

        if (!pet) throw new Error("Missing pet");
        if (typeof pet !== "object") throw new Error("Pet must be an object");

        if (!createdAt) throw new Error("Missing createdAt");
        if (isNaN(Date.parse(createdAt))) throw new Error("createdAt must be a valid date");

        if (!updatedAt) throw new Error("Missing updatedAt");
        if (isNaN(Date.parse(updatedAt))) throw new Error("updatedAt must be a valid date");

        if (!location) throw new Error("Missing location");
        if (typeof location !== "object") throw new Error("Location must be an object");

        if (!comments) throw new Error("Missing comments");
        if (!Array.isArray(comments)) throw new Error("Comments must be an array");


        return new RewardEntity({
            id: id || _id,
            amount,
            description,
            pet,
            createdAt,
            updatedAt,
            comments,
            location,
        });
    }
}
