import { Request, Response } from "express";
import { GetPets, PaginationDto, PetRepository, handleError } from "../../domain";


export class PetController {

    constructor( 
        private petRepository: PetRepository
     ) {}

    public getPets = (req: Request, res: Response) => {

        const { page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create( +page, +limit )
        if (error) return res.status(400).json({ error });
        
        new GetPets(this.petRepository)
            .execute( paginationDto!)
            .then( paginatedPetsResponse => res.json(paginatedPetsResponse))
            .catch( error => handleError(error, res));
    }

}