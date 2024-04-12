import { RewardEntity } from "../../entities/reward.entity";
import { RewardRepository } from "../../repositories/reward.repository";

export interface DeleteRewardUseCase {
    execute(id: number): Promise<RewardEntity>;
}

export class DeleteReward implements DeleteRewardUseCase {

    constructor(
        private rewardRepository: RewardRepository
    ) {}

    async execute(id: number): Promise<RewardEntity> {
        return this.rewardRepository.deleteById(id);
    }
}