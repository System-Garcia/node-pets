import { Request, Response } from "express";
import {
  DeleteUser,
  GetUsers,
  PaginationDto,
  UpdatePermissionsUser,
  UpdateUser,
  UpdateUserDto,
  UpdateUserPermissionsDto,
  UserRepository,
  handleError,
} from "../../domain";
import { S3Service } from "../services/s3.service";
import { UploadedFile } from "express-fileupload";
import { regularExps } from "../../config/regular-exp";


export class UsersController {

    constructor( 
        private readonly userRepository: UserRepository, 
        private readonly s3Service: S3Service
    ) {}

    public getUsers = (req: Request, res: Response) => {
        
        const { page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create( +page, +limit )
        if (error) return res.status(400).json({ error });

        new GetUsers(this.userRepository)
            .execute(paginationDto!)
            .then( paginatedUsersResponse => res.json(paginatedUsersResponse))
            .catch( error => handleError(error, res));
    };

    /* 
    
    todo: documentar todo el codigo actual
    todo: Agregar un middleware de manejo de errores
    
    */

    public updateUser = async (req: Request, res: Response) => {

        const [ hasError, isValid ] = this.validateUpdateUserInput(req.body);
        if ( hasError ) return res.status(400).json({ error: hasError });
        
        if (req.body.files) {
            const imageFile = req.body.files.at(0) as UploadedFile;
            const imageURL = await this.s3Service.uploadImage(imageFile);

            req.body.img = imageURL;
        } else {
            req.body.img = null;
        }

        const id = +req.params.id;
       
        const  [ error, updateUserDto] = UpdateUserDto.create({...req.body, id});
        if ( error ) return res.status(400).json({ error });

       new UpdateUser(this.userRepository)
        .execute(updateUserDto!)
        .then( user => res.json(user))
        .catch( error => handleError(error, res));

    }

    public updatePermissions = (req: Request, res: Response) => {
        
        const id = +req.params.id;
        const [ error, updateUserPermissionsDto] = UpdateUserPermissionsDto.create({...req.body, id});

        if ( error ) return res.status(400).json({ error });

        new UpdatePermissionsUser(this.userRepository)
            .execute(updateUserPermissionsDto!)
            .then( user => res.json(user))
            .catch( error => handleError(error, res))
    }

   
    private validateUpdateUserInput = (object: {[key: string]: any}) => {

        const { 
            email,
            dateOfBirth,
        } = object;

        let newDateOfBirth = new Date(dateOfBirth);
        if(dateOfBirth) {
            if(newDateOfBirth.toString() === 'Invalid Date') {
                return ['CompletedAt must be a valid date'];
            }
        };

        if (email) {
            if (!regularExps.email.test(email)) return ['Email must be a valid email'];
        }


        return [undefined, true];
    }

    public deleteUser = async (req: Request, res: Response) => {

        const id = +req.params.id;

        if ( !id ) return res.status(400).json({ error: 'id is required'}); 
        if ( isNaN(id)) return res.status(400).json({ error: 'id must be a valid number'});
    
        new DeleteUser(this.userRepository)
            .execute(id)
            .then( deletedUser => res.json(deletedUser))
            .catch( error => handleError(error, res))
    }
}