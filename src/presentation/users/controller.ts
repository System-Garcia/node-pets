import { Request, Response } from "express";
import {
  CreateUser,
  CreateUserDto,
  GetUsers,
  LoginUser,
  LoginUserDto,
  PaginationDto,
  UserRepository,
  handleError,
} from "../../domain";


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
    
    */
    public loginUser = (req: Request, res: Response) => {
        
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        new LoginUser(this.userRepository)
            .execute(loginUserDto!)
            .then( user => res.json(user))
            .catch( error => handleError(error, res))

    }
}