import { UpdateLocationDto } from "../dtos/locations/update-location.dto";
import { UpdateRewardDto } from "../dtos/rewards/update-reward.dto";

export interface UpdateRewardAndLocationData {
    reward: UpdateRewardDto,
    location: UpdateLocationDto,
}