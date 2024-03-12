import { Request, Response } from "express";
import { CreateUser, CreateUserDto, LoginUserDto, handleError } from "../../domain";
import { AuthService } from "../services/auth.service";
import { S3Service } from "../services/s3.service";
import { UploadedFile } from "express-fileupload";
import { regularExps } from "../../config/regular-exp";


export class AuthController {

    constructor( 
        private readonly authService: AuthService,
        private readonly s3Service: S3Service,
    ) {}

    public loginUser = async (req: Request, res: Response) => {
        try {
            const [error, loginUserDto] = LoginUserDto.create(req.body);
            if (error) return res.status(400).json({ error });

            const { user, token } = await this.authService.loginUser(loginUserDto!);
            res.json({ user, token });
        } catch (error) {
            handleError(error, res);
        }
    };

    public registerUser = async (req: Request, res: Response) => {
        let imageURL: string | null = null;

        try {

            const [ hasError, isValid ] = this.validateCreateUserInput(req.body);
            if (hasError) return res.status(400).json({ error: hasError }); 

            const imageFile = req.body.files.at(0) as UploadedFile;
            imageURL = await this.s3Service.uploadImage(imageFile);
            
            const [error, createUserDto] = CreateUserDto.create({...req.body, img: imageURL});
            if (error) return res.status(400).json({ error });
    
            const user = await this.authService.registerUser(createUserDto!);

            res.json(user)
                
        } catch (error) {

            if (imageURL) {
                const deletionResult = await this.s3Service.deleteImage(imageURL);
                if(!deletionResult.success) console.log(deletionResult.error);
            }
        
            handleError(error, res);
        }
    }

    validateEmail = (req: Request, res: Response) => {
        
        const { token } = req.params;
        if (!token) return res.status(400).json({ error: 'Missing token' });

        this.authService.validateEmail(token)
            .then( () => res.json({ message: 'Email validated successfully'}))
            .catch( error => handleError(error, res));
    }

    forgotPassword = (req: Request, res: Response) => {

        const email = req.body.email;
        if (!email) return res.status(400).json({ error: 'Missing email' });

        const validatedEmail = regularExps.email.test(email);
        if (!validatedEmail) return res.status(400).json({ error: 'Invalid email' });

        this.authService.forgotPassword(email)
            .then( () => res.json({ message: 'If your email is registered, you will receive a link to reset your password.'}))
            .catch( error => handleError(error, res));
    };

    resetPassword = (req: Request, res: Response) => {

        const { token, password } = req.body;
        if (!token) return res.status(400).json({ error: 'Missing token' });
        if (!password) return res.status(400).json({ error: 'Missing password' });

        this.authService.resetPassword(token, password)
            .then( () => res.json({ message: 'Password reset successfully'}))
            .catch( error => handleError(error, res));
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
}