import { prisma } from "../../../data/postgres";
import {
  CreateRewardDto,
  PaginatedRewardResponse,
  RewardDatasource,
  RewardEntity,
  UpdateRewardDto,
} from "../../../domain";

export class PostgresRewardDatasource implements RewardDatasource {

    async getAll(): Promise<PaginatedRewardResponse> {
        throw new Error("Method not implemented.");
    }

    async create(createRewardDto: CreateRewardDto): Promise<RewardEntity> {
        
        try {
            
            const reward = await prisma.reward.create({
                data: {
                    ...createRewardDto,
                },
                include:{
                    location: true,
                    comments: true,
                    pet: true,
                }
            });


            return RewardEntity.fromObject(reward);


        } catch (error) {
            throw error;
        }

    }

    async updateById(updateRewardDto: UpdateRewardDto): Promise<RewardEntity> {
        throw new Error("Method not implemented.");
    }

    async deleteById(id: number): Promise<RewardEntity> {
        throw new Error("Method not implemented.");
    }
}
