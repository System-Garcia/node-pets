import { UpdateRewardDto } from '../../dtos/rewards/update-reward.dto';
import { RewardEntity } from '../../entities/reward.entity';
import { RewardRepository } from '../../repositories/reward.repository';

interface UpdateRewardUseCase {
    execute(rewardData: UpdateRewardDto): Promise<RewardEntity>;
};


export class UpdateReward implements UpdateRewardUseCase {

    constructor(
        private readonly repository: RewardRepository
    ) {}

    async execute(rewardData: UpdateRewardDto): Promise<RewardEntity> {
        return this.repository.updateById(rewardData);
    }
}
