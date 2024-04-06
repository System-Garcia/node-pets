import {
  CreateRewardDto,
  PaginatedRewardResponse,
  RewardDatasource,
  RewardEntity,
  RewardRepository,
  UpdateRewardDto,
} from "../../domain";

export class RewardRepositoryImpl implements RewardRepository {
    constructor(private readonly datasource: RewardDatasource) {}

    async create(createRewardDto: CreateRewardDto): Promise<RewardEntity> {
        return this.datasource.create(createRewardDto);
    }

    async updateById(updateRewardDto: UpdateRewardDto): Promise<RewardEntity> {
        return this.datasource.updateById(updateRewardDto);
    }

    async deleteById(id: number): Promise<RewardEntity> {
        return this.datasource.deleteById(id);
    }

    async getAll(): Promise<PaginatedRewardResponse> {
        return this.datasource.getAll();
    }

    async findById(id: number): Promise<RewardEntity> {
        return this.datasource.findById(id);
    }
}
