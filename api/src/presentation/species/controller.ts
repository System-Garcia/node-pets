import { Request, Response } from "express";
import { CreateSpecies, CreateSpeciesDto, DeleteSpecies, GetSpecies, PaginationDto, SpeciesRepository, UpdateSpecies, UpdateSpeciesDto, handleError } from "../../domain";


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

    public deleteSpecies = (req: Request, res: Response) => {
        
        const id = +req.params.id;

        if ( !id ) return res.status(400).json({ error: 'id is required'}); 
        if ( isNaN(id)) return res.status(400).json({ error: 'id must be a valid number'});

        new DeleteSpecies(this.speciesRepository)
            .execute(id)
            .then( species => res.json(species))
            .catch( error => handleError(error, res));
    }

    public updateSpecies = (req: Request, res: Response) => {
        
        const id = +req.params.id;
        if ( isNaN(id)) return res.status(400).json({ error: 'id must be a valid number'});
        
        const [error, speciesUpdateDto] = UpdateSpeciesDto.create({...req.body, id});
        if (error) return res.status(400).json({ error });

        new UpdateSpecies(this.speciesRepository)
            .execute(speciesUpdateDto!)
            .then( species => res.json(species))
            .catch( error => handleError(error, res));

    }

}