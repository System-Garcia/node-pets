import { regularExps } from "../../../config/regular-exp";

interface IUpdateUserDto {
    id: number,
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    dateOfBirth?: Date;
    img?: string;
    permissions?: number[]; 
}


export class UpdateUserDto {

    public readonly id;
    public readonly firstName;
    public readonly lastName;
    public readonly phoneNumber;
    public readonly email;
    public readonly password;
    public readonly dateOfBirth;
    public readonly img;
    public readonly permissions;

    private constructor(userProps: IUpdateUserDto) {
        this.id = userProps.id;
        this.firstName = userProps.firstName;
        this.lastName = userProps.lastName;
        this.phoneNumber = userProps.phoneNumber;
        this.email = userProps.email;
        this.password = userProps.password;
        this.dateOfBirth = userProps.dateOfBirth;
        this.img = userProps.img;
        this.permissions = userProps.permissions;
    }

    get permission() {
        return this.permissions;
    }

    get values() {

        const returnObj: {[key: string]: any} = {};

        if(this.firstName) returnObj.firstName = this.firstName;
        if(this.lastName) returnObj.lastName = this.lastName;
        if(this.phoneNumber) returnObj.phoneNumber = this.phoneNumber;
        if(this.email) returnObj.email = this.email;
        if(this.password) returnObj.password = this.password;
        if(this.dateOfBirth) returnObj.dateOfBirth = this.dateOfBirth;
        if(this.img) returnObj.img = this.img;

        return returnObj;
    }


    static create(props: {[key: string]: any}): [string?, UpdateUserDto?] {

        const { 
            id, 
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            dateOfBirth,
            img,
            permissions,
        } = props;

        
        if ( !id || isNaN(id)) return ['Id must be a valid number'];

        let newDateOfBirth = new Date(dateOfBirth);
        if(dateOfBirth) {
            if(newDateOfBirth.toString() === 'Invalid Date') {
                return ['CompletedAt must be a valid date'];
            }
        };

        
        if( permissions ) {

            if(!Array.isArray(permissions)) {
                return ['Permissions must be an array'];
            }

            if (permissions.length === 0) return ['Permissions must not be empty'];

            permissions.forEach( permission => {

                if(isNaN(permission)) {
                    return ['Permissions must be an array of numbers'];
                }
            });
        };

        if (email) {
            if (!regularExps.email.test(email)) return ['Email must be a valid email'];
        }


        return [undefined, new UpdateUserDto({
            id,
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            dateOfBirth,
            img,
            permissions,
        })];

    }
}