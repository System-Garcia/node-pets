import { PaginationDto } from "../dtos/shared/pagination.dto";
import { RewardEntity } from "../entities/reward.entity";
import { PaginatedRewardResponse } from "../interfaces/paginated-reward-res.interface";
import { UpdateRewardAndLocationData } from "../interfaces/updateRewardAndLocationData.interface";


export abstract class RewardService {
    abstract createRewardWithLocation(reward: any): Promise<RewardEntity>;
    abstract deleteReward(id: number): Promise<RewardEntity>;
    abstract updateReward(data: UpdateRewardAndLocationData): Promise<RewardEntity>;
    abstract getAll(paginationDto: PaginationDto) : Promise<PaginatedRewardResponse>
}