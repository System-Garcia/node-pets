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
        include: {
          location: {
            select: {
              id: true,
              address: true,
              country: true,
              city: true,
              latitude: true,
              longitude: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          comments: {
            select: {
              id: true,
              rewardId: true,
              userId: true,
              text: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          pet: {
            select: {
              id: true,
              ownerId: true,
              name: true,
              speciesId: true,
              color: true,
              img: true,
              missingAt: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return RewardEntity.fromObject(reward);
    } catch (error) {
      throw error;
    }
  }

  async updateById(updateRewardDto: UpdateRewardDto): Promise<RewardEntity> {
    try {
      const rewardExists = await this.verifiyRewardExists(updateRewardDto.id);
      if (!rewardExists) {
        throw CustomError.notFound(
          `Reward with id ${updateRewardDto.id} not found`
        );
      }

      const reward = await prisma.reward.update({
        where: {
          id: updateRewardDto.id,
        },
        data: {
          ...updateRewardDto,
        },
        include: {
          location: {
            select: {
              id: true,
              address: true,
              country: true,
              city: true,
              latitude: true,
              longitude: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          comments: {
            select: {
              id: true,
              rewardId: true,
              userId: true,
              text: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          pet: {
            select: {
              id: true,
              ownerId: true,
              name: true,
              speciesId: true,
              color: true,
              img: true,
              missingAt: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return RewardEntity.fromObject(reward);
    } catch (error) {
      throw error;
    }
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
        include: {
          location: {
            select: {
              id: true,
              address: true,
              country: true,
              city: true,
              latitude: true,
              longitude: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          comments: {
            select: {
              id: true,
              rewardId: true,
              userId: true,
              text: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          pet: {
            select: {
              id: true,
              ownerId: true,
              name: true,
              speciesId: true,
              color: true,
              img: true,
              missingAt: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
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
        include: {
          location: {
            select: {
              id: true,
              address: true,
              country: true,
              city: true,
              latitude: true,
              longitude: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          comments: {
            select: {
              id: true,
              rewardId: true,
              userId: true,
              text: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          pet: {
            select: {
              id: true,
              ownerId: true,
              name: true,
              speciesId: true,
              color: true,
              img: true,
              missingAt: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      if (!reward) {
        throw CustomError.notFound("Reward not found");
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
        },
      });

      return !!reward;
    } catch (error) {
      throw error;
    }
  }
}
