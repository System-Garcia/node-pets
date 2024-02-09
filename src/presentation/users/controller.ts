import { Request, Response } from "express";
import {
  CreateUser,
  CreateUserDto,
  GetUsers,
  LoginUser,
  LoginUserDto,
  PaginationDto,
  UpdateUserDto,
  UserRepository,
  handleError,
} from "../../domain";
import { UpdateUser } from "../../domain/use-cases/user/update-user";
import { JwtGeneraton } from "../../config/jwt.adapter";
import { envs } from "../../config";


export class UsersController {

    constructor( private readonly userRepository: UserRepository) {}

    public getUsers = (req: Request, res: Response) => {
        
        const { page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create( +page, +limit )
        if (error) return res.status(400).json({ error });

        new GetUsers(this.userRepository)
            .execute(paginationDto!)
            .then( paginatedUsersResponse => res.json(paginatedUsersResponse))
            .catch( error => handleError(error, res));
    };

    public createUser = (req: Request, res: Response) => {

        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateUser(this.userRepository)
            .execute(createUserDto!)
            .then( user => res.json(user))
            .catch( error => handleError(error, res));
    };


    /* 
    
    todo: Devolver usuarios con el token en el login
    todo: Proteger rutas con un middleware
    todo: Terminar todas las rutas de permissions
    todo: documentar todo el codigo actual
    
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
}