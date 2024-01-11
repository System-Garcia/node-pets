interface IUserEntity {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  emailValidated: string;
  password: string;
  dateOfBirth: Date;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  constructor(public readonly user: IUserEntity) {}

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
    } = object;

    if(!id) throw 'Id is required';
    if(!firstName) throw 'firstName is required';
    if(!lastName) throw 'lasName is required';
    if(!phoneNumber) throw 'phoneNumber is required';
    if(!email) throw 'email is required';
    if(!emailValidated) throw 'emailValidated is required';
    if(!password) throw 'password is required';
    if(!dateOfBirth) throw 'dateOfBirth is required';
    if(!img) throw 'createdAt is required';
    if(!createdAt) throw 'createdAt is required';
    if(!updatedAt) throw 'updatedAt is required';

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
        emailValidated,
        password,
        dateOfBirth,
        img,
        createdAt,
        updatedAt,})
  }
}
