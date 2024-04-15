import { prisma } from "../../../data/postgres";
import {
  CreateRewardDto,
  CustomError,
  PaginatedRewardResponse,
  PaginationDto,
  RewardDatasource,
  RewardEntity,
  UpdateRewardDto,
} from "../../../domain";

const rewardInclude = {
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
};

export class PostgresRewardDatasource implements RewardDatasource {

  constructor(private readonly webServiceUrl: string) {}

  async getAll(paginationDto: PaginationDto): Promise<PaginatedRewardResponse> {
    
    const { page, limit } = paginationDto;

    try {
      const skip = (page - 1) * limit;

      const [total, rewards] = await Promise.all([
        prisma.reward.count(),
        prisma.reward.findMany({
          where: { isDeleted: false },
          include: {
            ...rewardInclude,
          },
          skip: skip,
          take: limit,
        }),
      ]);

      const nextPage =
        page * limit >= total
          ? null
          : `${this.webServiceUrl}/rewards?page=${page + 1}&limit=${limit}`;

      const prevPage =
        page - 1 > 0
          ? `${this.webServiceUrl}/rewards?page=${page - 1}&limit=${limit}`
          : null;

      return {
        page,
        limit,
        total,
        next: nextPage,
        prev: prevPage,
        rewards: rewards.map((reward) => RewardEntity.fromObject(reward)),
      };
    } catch (error) {
      throw error;
    }
  }

  async create(createRewardDto: CreateRewardDto): Promise<RewardEntity> {
    try {
      const reward = await prisma.reward.create({
        data: {
          ...createRewardDto,
        },
        include: {
          ...rewardInclude,
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
          ...rewardInclude,
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
          ...rewardInclude,
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
          ...rewardInclude,
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
