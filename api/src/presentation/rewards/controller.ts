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

        const reward = {
            id: +req.params.id,
            ...req.body.reward,
        }
        
        const location = {
            id: res.locals.reward.location.id,
            ...req.body.location,
        };

        this.rewardService.updateReward({reward, location})
            .then( reward => res.json(reward))
            .catch( error => handleError(error, res));
    };

    public deleteById = (req: Request, res: Response) => {
        
        const id = +req.params.id;
        if (!id) return res.status(400).json({ error: "Missing reward id" });
        if (isNaN(id)) return res.status(400).json({ error: "Invalid reward id" });

        this.rewardService.deleteReward(id)
            .then( reward => res.json(reward))
            .catch( error => handleError(error, res));

    };

}
