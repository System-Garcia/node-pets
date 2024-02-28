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

    public  createUser = async (req: Request, res: Response) => {

        let imageURL: string | null = null;

        try {

            const [ hasError, isValid ] = this.validateCreateUserInput(req.body);
            if (hasError) return res.status(400).json({ error: hasError }); 

            const imageFile = req.body.files.at(0) as UploadedFile;
            imageURL = await this.s3Service.uploadImage(imageFile);
            
            const [error, createUserDto] = CreateUserDto.create({...req.body, img: imageURL});
            if (error) return res.status(400).json({ error });
    
            const user = await new CreateUser(this.userRepository).execute(createUserDto!);

            res.json(user)
                
        } catch (error) {

            if (imageURL) {
                const deletionResult = await this.s3Service.deleteImage(imageURL);
                if(!deletionResult.success) console.log(deletionResult.error);
            }
        
            handleError(error, res);
        }

       
    };


    /* 
    
    todo: Agregar campo 'isDeleted' a la base de datos en lugar de borrar literalmente los registros'
    todo: documentar todo el codigo actual
    todo: Agregar un middleware de manejo de errores
    
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

    /**
     * Performs a preliminary validation of user input before creating a user.
     * This method serves as an initial check to quickly catch missing or obviously invalid fields
     * before proceeding with more in-depth validation handled by the CreateUserDto.
     * It is designed to improve efficiency by preventing unnecessary operations (e.g., image upload to AWS S3)
     * if the basic criteria are not met.
     * 
     * @param object The user input data from the request body.
     * @returns A tuple where the first element is an optional error message, and the second element is a boolean indicating the validation result.
     * 
     * Note: This validation checks for the presence of essential fields such as firstName, lastName, phoneNumber, email, password, and dateOfBirth,
     * and performs a basic format validation on the email. The presence of the dateOfBirth is validated and checked to ensure it is a valid date.
     * A more comprehensive validation including business logic and constraints is delegated to the CreateUserDto.
     */
    private validateCreateUserInput = (object: {[key: string]: any}) => {
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            dateOfBirth,
        } = object;

        if ( !firstName ) return ['Missing firstName'];
        if ( !lastName ) return ['Missing lastName'];
        if ( !phoneNumber ) return ['Missing phone number'];
        if ( !regularExps.phoneNumber.test(phoneNumber)) return ['Phone number is not valid']
        if ( !email ) return ['Missing email'];
        if ( !regularExps.email.test(email)) return ['Email is not valid'];
        if ( !password ) return ['Missing password'];
        if ( password.length < 6) return ['Password too short, the minimum length is 6']
        if ( !dateOfBirth ) return ['Missing dateOfBirth'];
        
        let newDateOfBirth = new Date(dateOfBirth);

        if( isNaN(newDateOfBirth.getTime())) {
            return ['dateOfBirth must be a valid Date']
        }
        
        return [undefined, true];
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

    // TODO: Implementar metodo
    public deleteUser = async (req: Request, res: Response) => {
        return res.json('Borrando')
    }
}