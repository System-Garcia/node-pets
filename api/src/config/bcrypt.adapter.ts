import { hashSync, compareSync, genSaltSync } from 'bcryptjs'

export class BcryptAdapter {

    public static hash = (passowrd: string) => {
        const salt = genSaltSync();
        return hashSync(passowrd, salt);
    }

    public static compare = (password: string, hashed: string) => {
        return compareSync(password, hashed);
    }

}