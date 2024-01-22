import { regularExps } from "../../../config/regular-exp";

interface ICreateUserDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    img: string;
}

export class CreateUserDto {

    public readonly firstName;
    public readonly lastName;
    public readonly phoneNumber;
    public readonly email;
    public readonly password;
    public readonly dateOfBirth;
    public readonly img;
    
    private constructor( userProps: ICreateUserDto  ) {
        this.firstName = userProps.firstName;
        this.lastName = userProps.lastName;
        this.phoneNumber = userProps.phoneNumber;
        this.email = userProps.email;
        this.password = userProps.password;
        this.dateOfBirth = userProps.dateOfBirth;
        this.img = userProps.img;
    }

    public static create(object: {[key: string]: any}): [string?, CreateUserDto?] {

        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            dateOfBirth,
            img,
        } = object;

        if ( !firstName ) return ['Missing firstName'];
        if ( !lastName ) return ['Missing lastName'];
        if ( !phoneNumber ) return ['Missing phone number'];
        if ( !email ) return ['Missing email'];
        if ( !regularExps.email.test(email)) return ['Email is not valid'];
        if ( !password ) return ['Missing password'];
        if ( password.length < 6) return ['Password too short, the minimum length is 6']
        if ( !dateOfBirth ) return ['Missing dateOfBirth'];
        
        let newDateOfBirth = new Date(dateOfBirth);

        if( isNaN(newDateOfBirth.getTime())) {
            return ['dateOfBirth must be a valid Date']
        }
        

        if ( !img ) return ['Missing img URL'];
      

        return [undefined, new CreateUserDto({
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            img,
            dateOfBirth: newDateOfBirth,
        })];

    };

};