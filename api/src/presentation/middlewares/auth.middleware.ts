import { NextFunction, Request, Response } from "express";
import { JwtGeneraton } from "../../config/jwt.adapter";
import { envs } from "../../config";
import { UserDatasource, UserEntity, handleError } from "../../domain";


export class AuthMiddleware {

    constructor(private userDatasource: UserDatasource) {}

    validateJWT = async(req: Request, res: Response, next: NextFunction) => {

        const authorization = req.header('Authorization');
        if ( !authorization ) return res.status(401).json({ error: 'No token provider'});

        if( !authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token'});

        const token = authorization.split(' ').at(1) || '';
        
        
        try {
            
            const payload = await new JwtGeneraton(envs.JWT_SEED).validateToken<{ id: string }>(token);
            if(!payload) return res.status(401).json({ error: 'Invalid token - user'});

            const user = await this.userDatasource.findById(+payload.id);
            req.body.user = UserEntity.fromObject(user);

            next();

            
        } catch (error) {
            handleError(error, res);
        };
    };


    // this middleware need to request has been passed for the validateJWT middleware
    verifyAdmin = async(req: Request, res: Response, next: NextFunction) => {

      const user = req.body.user as UserEntity
     
      // Verify that user and user.permissions exist
      if (!user || !user.permissions || !user.permissions.some( permission => permission.name === 'Admin')) {
        return res.status(403).json({ error: 'Access denied' });
      };

      next();
    }

    verifySelfOrAdmin = async (req: Request, res: Response, next: NextFunction) => {

      const user = req.body.user as UserEntity;
      const userIdToUpdate = parseInt(req.params.id);

      if (isNaN(userIdToUpdate)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      if( !user.permissions.some( permission => permission.name === 'Admin') && user.id !== userIdToUpdate) {
        return res.status(403).json({ error: 'Access denied - You can only update your own data' });
      }

      next();
    }

}