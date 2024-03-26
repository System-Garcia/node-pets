import { Request, Response } from "express";
import { RewardService, handleError } from "../../domain";


export class RewardController {

    constructor(
        private readonly rewardService: RewardService,
    ) {}

    public getAll = (req: Request, res: Response) => {
        res.json({ message: 'Get all rewards' });
    };

    public create = (req: Request, res: Response) => {
        
        this.rewardService.createRewardWithLocation(req.body)
            .then( reward => res.json(reward))
            .catch( error => handleError(error, res));

    };

    public updateById = (req: Request, res: Response) => {
        res.json({ message: 'Update reward by id' });
    };

    public deleteById = (req: Request, res: Response) => {
        res.json({ message: 'Delete reward by id' });
    };

}
