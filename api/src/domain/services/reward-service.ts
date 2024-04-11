import { RewardEntity } from "../entities/reward.entity";
import { UpdateRewardAndLocationData } from "../interfaces/updateRewardAndLocationData.interface";


export abstract class RewardService {
    abstract createRewardWithLocation(reward: any): Promise<RewardEntity>;
    abstract deleteReward(id: number): Promise<RewardEntity>;
    abstract updateReward(data: UpdateRewardAndLocationData): Promise<RewardEntity>;
}