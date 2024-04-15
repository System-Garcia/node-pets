import { RewardEntity } from "../entities/reward.entity";

export interface PaginatedRewardResponse {
    page: number;
    limit: number;
    total: number;
    next: string | null;
    prev: string | null;
    rewards: RewardEntity[];
}
