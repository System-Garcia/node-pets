import { NextFunction, Request, Response } from "express";
import { PetRepository, handleError } from "../../domain";

export class RewardMiddleware {
    constructor(private readonly petRepository: PetRepository) {}

    /**
     * Middleware function to verify ownership of a pet.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     * @param next - The next middleware function.
     */
    public verifyPetOwnership = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
            const petId = +req.body.reward.petId;
            if (!petId) return res.status(400).json({ error: "Missing pet id" });

            const userId = req.body.user.id;

            try {
            const pet = await this.petRepository.findById(petId);

            if (userId !== pet.ownerId) {
                return res
                .status(403)
                .json({ error: "You are not allowed to perform this action" });
            }

            next();
        } catch (error) {
            handleError(error, res);
        }
    };
}
