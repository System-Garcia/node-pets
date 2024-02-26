import { Request, Response } from "express";
import {
  CreateUser,
  CreateUserDto,
  GetUsers,
  LoginUser,
  LoginUserDto,
  PaginationDto,
  UpdatePermissionsUser,
  UpdateUser,
  UpdateUserDto,
  UpdateUserPermissionsDto,
  UserRepository,
  handleError,
} from "../../domain";
import { JwtGeneraton } from "../../config/jwt.adapter";
import { envs } from "../../config";
import { S3Service } from "../services/s3.service";
import { UploadedFile } from "express-fileupload";


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

    public  createUser = async (req: Request, res: Response) => {

        try {

            const imageFile = req.body.files.at(0) as UploadedFile;
            const imageURL = await this.s3Service.uploadImage(imageFile);
            
            const [error, createUserDto] = CreateUserDto.create({...req.body, img: imageURL});
            if (error) return res.status(400).json({ error });
    
            const user = await new CreateUser(this.userRepository).execute(createUserDto!);

            res.json(user)
                
        } catch (error) {
            handleError(error, res)
        }

       
    };


    /* 
    
    todo: documentar todo el codigo actual
    todo: En la creacion del usuario ver de que forma se pueden validar los dtos antes de subir la imagen.
    
    */
    public loginUser = async (req: Request, res: Response) => {
        
        try {
            const [error, loginUserDto] = LoginUserDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            const user = await new LoginUser(this.userRepository).execute(loginUserDto!);
            
            const token = await new JwtGeneraton(envs.JWT_SEED).generateToken({ id: user.id });

            res.json({user, token});

        } catch (error) {
            handleError(error, res);
        }
    }

    public updateUser = (req: Request, res: Response) => {

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
}