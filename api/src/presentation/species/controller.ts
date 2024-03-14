import { Request, Response } from "express";
import { CreateSpecies, CreateSpeciesDto, SpeciesRepository, handleError } from "../../domain";


export class SpeciesController {

    constructor(private readonly speciesRepository: SpeciesRepository) {}

    public createSpecies = (req: Request, res: Response) => {

        const [error, speciesCreateDto] = CreateSpeciesDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateSpecies(this.speciesRepository)
            .execute(speciesCreateDto!)
            .then( species => res.json(species))
            .catch( error => handleError(error, res));
    }

}