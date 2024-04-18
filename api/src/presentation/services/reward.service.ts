import { UpdateLocationDto } from '../../domain/dtos/locations/update-location.dto';
import {
  CreateLocation,
  CreateLocationDto,
  CreateReward,
  CreateRewardDto,
  CustomError,
  DeleteReward,
  ICreateLocationDto,
  ICreateRewardDto,
  LocationRepository,
  PaginatedRewardResponse,
  PaginationDto,
  RewardEntity,
  RewardRepository,
  RewardService,
  UpdateRewardAndLocationData,
  UpdateRewardDto,
} from "../../domain/";

interface RewardAndLocationData {
  reward: Omit<ICreateRewardDto, "locationId">;
  location: ICreateLocationDto;
}

export class RewardServiceImpl implements RewardService {
  constructor(
    private readonly rewardRepository: RewardRepository,
    private readonly locationRepository: LocationRepository
  ) {}

  getAll(paginationDto: PaginationDto): Promise<PaginatedRewardResponse> {
    
    return this.rewardRepository.getAll(paginationDto);

  }
  
  async updateReward(data: UpdateRewardAndLocationData): Promise<RewardEntity> {
    
    const { reward, location } = data;
    
    const [locationError, updateLocationDto] = UpdateLocationDto.create(location);
    if (locationError) throw CustomError.badRequest(locationError);

    const [rewardError, updateRewardDto] = UpdateRewardDto.create({
      ...reward,
      locationId: +updateLocationDto!.id,
    });

    if (rewardError) throw CustomError.badRequest(rewardError);

    this.locationRepository.update(updateLocationDto!);

    return this.rewardRepository.updateById(updateRewardDto!);

  }

  async createRewardWithLocation(
    data: RewardAndLocationData
  ): Promise<RewardEntity> {
    let locationId: number | null = null;

    try {
      const { reward, location } = data;
      
      if(!reward) throw CustomError.badRequest('Missing reward data');
      if(!location) throw CustomError.badRequest('Missing location')

      const [locationError, createLocationDto] =
        CreateLocationDto.create(location);
      if (locationError) throw CustomError.badRequest(locationError);

      locationId = (
        await new CreateLocation(this.locationRepository).execute(
          createLocationDto!
        )
      ).id;

      const [rewardError, createRewardDto] = CreateRewardDto.create({
        ...reward,
        locationId,
      });
      if (rewardError) throw CustomError.badRequest(rewardError);

      return await new CreateReward(this.rewardRepository).execute(
        createRewardDto!
      );
    } catch (error) {
      if (locationId) {
        await this.locationRepository.deleteHardById(locationId);
      }

      throw error;
    }
  }

  async deleteReward(id: number): Promise<RewardEntity> {
    return new DeleteReward(this.rewardRepository).execute(id);
  }
}
