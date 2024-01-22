import { IPermission } from "./permission.entity";


interface IUserEntity {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  emailValidated: boolean;
  password: string;
  dateOfBirth: Date;
  img: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: IPermission[];
}

export class UserEntity {

  public readonly id: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phoneNumber: string;
  public readonly email: string;
  public readonly emailValidated: boolean;
  public readonly password: string;
  public readonly dateOfBirth: Date;
  public readonly img: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly permissions: IPermission[];

  constructor( user: IUserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.emailValidated = user.emailValidated;
    this.password = user.password;
    this.dateOfBirth = user.dateOfBirth;
    this.img = user.img;
    this.createdAt = user.createdAt;  
    this.updatedAt = user.updatedAt;
    this.permissions = user.permissions;
  }

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const {
      id,
      firstName,
      lastName,
      phoneNumber,
      email,
      emailValidated,
      password,
      dateOfBirth,
      img,
      createdAt,
      updatedAt,
      permissions,
    } = object;

    console.log(permissions)

    if(!id || isNaN(id)) throw 'id is required and must be a valid number';
    if(!firstName) throw 'firstName is required';
    if(!lastName) throw 'lasName is required';
    if(!phoneNumber) throw 'phoneNumber is required';
    if(!email) throw 'email is required';
    
    let emailValidatedBooelan = emailValidated;
    if(typeof emailValidated !== 'boolean') {
      emailValidatedBooelan = (emailValidated === 'true')
    }

    if(!password) throw 'password is required';
    if(!dateOfBirth) throw 'dateOfBirth is required';
    if(!img) throw 'createdAt is required';
    if(!createdAt) throw 'createdAt is required';
    if(!updatedAt) throw 'updatedAt is required';
    if(!permissions || permissions.length === 0) throw 'permissions is required';
    if(!Array.isArray(permissions)) throw 'Permissions must be an Array'

    const newDateOfBirth = new Date(dateOfBirth);
    if(isNaN(newDateOfBirth.getTime())) throw 'dateOfBirth is not a valid Date'

    const newCreatedAt = new Date(createdAt);
    if(isNaN(newCreatedAt.getTime())) {
        throw 'createdAt is not a valid Date'
    };

    const newUpdatedAt = new Date(updatedAt);
    if(isNaN(newUpdatedAt.getTime())) throw 'updatedAt is not a valid Date'

    return new UserEntity({
        id,
        firstName,
        lastName,
        phoneNumber,
        email,
        emailValidated: emailValidatedBooelan,
        password,
        dateOfBirth,
        img,
        createdAt,
        updatedAt,
        permissions,
      });
  }
}
