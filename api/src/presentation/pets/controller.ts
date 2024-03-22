import { Request, Response } from "express";
import { CreatePet, CreatePetDto, DeletePet, GetPets, PaginationDto, PetRepository, handleError } from "../../domain";
import { S3Service } from "../services/s3.service";
import { UploadedFile } from "express-fileupload";


export class PetController {

    constructor( 
        private petRepository: PetRepository,
        private readonly s3Service: S3Service,
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

    public createPet = async (req: Request, res: Response) => {
        
        let imageURL: string | null = null;

        try {
            const ownerId = req.body.user.id;

            const [ hasError ] = this.validateCreatePetInput({...req.body, ownerId});
            if (hasError) return res.status(400).json({ error: hasError });
            
            const imageFile = req.body.files.at(0) as UploadedFile;
            imageURL = await this.s3Service.uploadImage(imageFile);

            
            const [ error, createPetDto ] = CreatePetDto.create({...req.body, ownerId, img: imageURL });
            if (error) return res.status(400).json({ error });

            new CreatePet(this.petRepository)
                .execute(createPetDto!)
                .then( pet => res.json(pet))
                .catch( error => handleError(error, res));
            
        } catch (error) {
            
            if (imageURL) {
                const deletionResult = await this.s3Service.deleteImage(imageURL);
                if(!deletionResult.success) console.log(deletionResult.error);
            }
        
            handleError(error, res);
        }
    
    };

    public deletePet = (req: Request, res: Response) => {

        const petId = +req.params.id;
        if ( !petId ) return res.status(400).json({ error: "Missing pet id" });
        if ( isNaN(petId) ) return res.status(400).json({ error: "Pet id must be a number" });
        
        new DeletePet(this.petRepository)
            .execute( petId )
            .then( petDeleted => res.json(petDeleted))
            .catch( error => handleError(error, res));

    }


    private validateCreatePetInput = (object: {[key: string]: any}) => {
        let { ownerId, name, speciesId, color, missingAt } = object;

        if ( !ownerId ) return ["Missing ownerId"];
        if ( isNaN(ownerId) ) return ["OwnerId must be a number"];
        ownerId = parseInt(ownerId);

        if ( !name ) return ["Missing name"];
        if ( typeof name !== 'string') return ["Name must be a string"];

        if ( !speciesId ) return ["Missing species id"];
        if ( isNaN(speciesId) ) return ["Species id must be a number"];
        speciesId = parseInt(speciesId);
        
        if ( !color ) return ["Missing color"];
        if ( typeof color !== 'string') return ["Color must be a string"];
        if ( color.trim().length === 0 ) return ["Color cannot be empty"];
        if ( color.trim().length > 50 ) return ["Color cannot be longer than 50 characters"];
        color = color.trim().toLowerCase();

        if ( !missingAt ) return ["Missing missingAt"];

        let newMissingAt = new Date(missingAt);
        if (isNaN(newMissingAt.getTime())) return ["Invalid missingAt"];

        return [null, { ownerId, name, speciesId, color, missingAt: newMissingAt }];
    }

}