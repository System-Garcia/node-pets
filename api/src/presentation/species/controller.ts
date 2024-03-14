import { Request, Response } from "express";
import { CreateSpecies, CreateSpeciesDto, GetSpecies, PaginationDto, SpeciesRepository, handleError } from "../../domain";


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

    public getAllSpecies = (req: Request, res: Response) => {
        
        const { page = 1, limit = 10} = req.query;

        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        new GetSpecies(this.speciesRepository)
            .execute(paginationDto!)
            .then( species => res.json(species)) 
            .catch( error => handleError(error, res));
    }

}