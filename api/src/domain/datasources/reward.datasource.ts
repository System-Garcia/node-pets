import { CreateRewardDto } from "../dtos/rewards/create-reward.dto";
import { UpdateRewardDto } from "../dtos/rewards/update-reward.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { RewardEntity } from "../entities/reward.entity";
import { PaginatedRewardResponse } from "../interfaces/paginated-reward-res.interface";


export abstract class RewardDatasource {
    
    abstract getAll(paginationDto: PaginationDto): Promise<PaginatedRewardResponse>;
    abstract create(createRewardDto: CreateRewardDto): Promise<RewardEntity>;
    abstract updateById(updateRewardDto: UpdateRewardDto): Promise<RewardEntity>;
    abstract deleteById(id: number): Promise<RewardEntity>;
    abstract findById(id: number): Promise<RewardEntity>;
}