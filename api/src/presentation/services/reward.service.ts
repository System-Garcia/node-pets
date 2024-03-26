import { CreateLocation, CreateLocationDto, CreateReward, CreateRewardDto, CustomError, ICreateLocationDto, ICreateRewardDto, LocationRepository, RewardEntity, RewardRepository, RewardService } from '../../domain/';

interface RewardAndLocationData {
    reward: Omit<ICreateRewardDto, 'locationId'>;
    location: ICreateLocationDto;
}

export class RewardServiceImpl implements RewardService {
    
    constructor(
        private readonly rewardRepository: RewardRepository,
        private readonly locationRepository: LocationRepository,
    ) {}

    async createRewardWithLocation(data: RewardAndLocationData): Promise<RewardEntity> {
        
        let locationId: number | null = null;

        try {
            
            const { reward, location } = data;

            const [locationError, createLocationDto] = CreateLocationDto.create(location);
            if (locationError) throw CustomError.badRequest(locationError);

            locationId = (await new CreateLocation(this.locationRepository).execute(createLocationDto!)).id;

            const [rewardError, createRewardDto] = CreateRewardDto.create({
                ...reward,
                locationId,
            });
            if (rewardError) throw CustomError.badRequest(rewardError);

            return await new CreateReward(this.rewardRepository).execute(createRewardDto!);

        } catch (error) {
        
            if (locationId) {
                await this.locationRepository.deleteHardById(locationId);
            }

            throw error;
        }

    }
}