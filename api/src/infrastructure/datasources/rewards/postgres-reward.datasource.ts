import { prisma } from "../../../data/postgres";
import {
  CreateRewardDto,
  CustomError,
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
        
        try {
            
            const rewardExists = await this.verifiyRewardExists(id);
            if (!rewardExists) {
                throw CustomError.notFound(`Reward with id ${id} not found`);
            }

            const rewardDeleted = await prisma.reward.update({
                where: {
                    id,
                },
                data: {
                    isDeleted: true,
                },
                include:{
                    location: true,
                    comments: true,
                    pet: true,
                }
            });

            return RewardEntity.fromObject(rewardDeleted);

        } catch (error) {
            throw error;
        }

    }

    async findById(id: number): Promise<RewardEntity> {
        
        try {
            
            const reward = await prisma.reward.findUnique({
                where: {
                    id,
                    isDeleted: false,
                },
                include:{
                    location: true,
                    comments: true,
                    pet: true,
                }
            });

            if (!reward) {
                throw CustomError.notFound('Reward not found');
            }
            
            return RewardEntity.fromObject(reward);

        } catch (error) {
            throw error;
        }

    }

    async verifiyRewardExists(id: number): Promise<boolean> {
            
        try {
            
            const reward = await prisma.reward.findUnique({
                where: {
                    id,
                    isDeleted: false,
                }
            });

            return !!reward;

        } catch (error) {
            throw error;
        }
    
    }
}
