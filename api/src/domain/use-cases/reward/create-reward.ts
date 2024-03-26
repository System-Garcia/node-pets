import { CreateRewardDto } from "../../dtos/rewards/create-reward.dto";
import { RewardEntity } from "../../entities/reward.entity";
import { RewardRepository } from "../../repositories/reward.repository";

export interface CreateRewardUseCase {
    execute(createRewardDto: CreateRewardDto): Promise<RewardEntity>;
};


export class CreateReward {

    constructor(private rewardRepository: RewardRepository) {}

    async execute(createRewardDto: CreateRewardDto): Promise<RewardEntity> {
        return this.rewardRepository.create(createRewardDto);
    }
}