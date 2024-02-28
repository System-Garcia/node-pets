import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../domain";


export const userExistsMiddleware = (userRepository: UserRepository) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {

        const { email, phoneNumber } = req.body;

        if(!email) return res.status(400).json({ error: 'email is required'});
        if(!phoneNumber) return res.status(400).json({ error: 'phoneNumber is required'});

        const existsUser = await userRepository.existsByEmailOrPhoneNumber({email, phoneNumber});

        if(existsUser) return res.status(400).json({ error: 'The operation could not be completed because the provided information is already associated with an existing account or is invalid. Please verify your details and try again.'});

        next();
    }

}