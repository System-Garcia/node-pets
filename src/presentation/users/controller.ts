import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user.repository";
import { CreateUser, CreateUserDto, PaginationDto } from "../../domain";
import { handleError } from "../../domain/errors/handle-error";
import { GetUsers } from "../../domain/use-cases/user/get-users";

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
    }   
}