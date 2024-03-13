import { JwtGeneraton } from "../../config/jwt.adapter";
import { CreateUser, CreateUserDto, CustomError, EmailService, LoginUser, LoginUserDto, UserRepository, UserResponseDto } from "../../domain";

export class AuthService {

    private readonly jwtGenerator = new JwtGeneraton(this.jwtSeed);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService,
        private readonly jwtSeed: string,
        private readonly webServiceUrl: string,
        private readonly frontendUrl: string,
    ) {
         
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<{ user: UserResponseDto; token: string }> {
        const user = await new LoginUser(this.userRepository).execute(loginUserDto);
        const token = await new JwtGeneraton(this.jwtSeed).generateToken({ id: user.id }) as string | null;

        if(!token) throw CustomError.internalServer('Error generating token');

        return { user, token };
    }

    async registerUser(createUserDto: CreateUserDto){

        const user = await new CreateUser(this.userRepository).execute(createUserDto);

        await this.sendEmailValidationLink(user.email);

        return user;
    }

    private async sendEmailValidationLink(email: string){

        const token = await this.jwtGenerator.generateToken({ email });
        if(!token) throw CustomError.internalServer('Error getting token');


        const link = `${this.frontendUrl}/auth/validate-email?token=${token}`;
        
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: ${email}</a>
        `;


        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        };

        const isSent = await this.emailService.sendEmail(options);
        if(!isSent) throw CustomError.internalServer('Error sending email');


        return true;
    }

    public async validateEmail(token: string){
        const payload = await this.jwtGenerator.validateToken(token);
        if(!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await this.userRepository.findByEmail(email);
        if(!user) throw CustomError.notFound('User not found');

        await this.userRepository.validateUserEmail(user.id);

        return true;
    }


    public async forgotPassword(email: string){
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw CustomError.notFound('User not found');

        if(user.emailValidated === false) throw CustomError.unauthorized('Email not validated');

        const token = await this.jwtGenerator.generateToken({ email });
        if(!token) throw CustomError.internalServer('Error getting token');

        const link = `${this.frontendUrl}/auth/reset-password?token=${token}`;
        
        const html = `
            <h1>Reset your password</h1>
            <p>Click on the following link to reset your password</p>
            <a href="${ link }">Reset your password</a>
        `;

        const options = {
            to: email,
            subject: 'Reset your password',
            htmlBody: html,
        };

        const isSent = await this.emailService.sendEmail(options);
        if(!isSent) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public async resetPassword(token: string, newPassword: string){
        const payload = await this.jwtGenerator.validateToken(token);
        if(!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await this.userRepository.findByEmail(email);
        if(!user) throw CustomError.notFound('User not found');

        await this.userRepository.updatePasswordById(user.id, newPassword);

        return true;
    }
}

