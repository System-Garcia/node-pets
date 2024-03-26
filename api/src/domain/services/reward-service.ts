import { RewardEntity } from "../entities/reward.entity";


export abstract class RewardService {
    abstract createRewardWithLocation(reward: any): Promise<RewardEntity>;
}