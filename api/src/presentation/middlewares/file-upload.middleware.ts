import { NextFunction, Request, Response } from "express";


export class FileUploadMiddleware {

    static containFiles = (req: Request, res: Response, next: NextFunction) => {

        if( !req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json( { error : 'No files were selected'});
        }
     
        req.body.files = this.convertFilesToArray(req.files.file);

        const { isValid, extensions } = this.validateImagesExtension( req.body.files );
        console.log(isValid)

        if (!isValid) return res.status(400).json({ error: `Invalid extension. Only ${extensions.join(',')} are accepted.`})
        
        next();
    }

    static objectToArray = (req: Request, res: Response, next: NextFunction) => {

        if (req.files) {
            req.body.files = this.convertFilesToArray(req.files.file);

            const { isValid, extensions } = this.validateImagesExtension( req.body.files );
            if (!isValid) return res.status(400).json({ error: `Invalid extension. Only ${extensions.join(',')} are accepted.`})
        };

        next();
    };

    private static convertFilesToArray = (files: any): any[] => {

        if ( !Array.isArray(files)) {
            return [ files ];
        };

        return files ;

    }

    private static validateImagesExtension = (files: any[]) => {

        const extensions = ['image/jpg', 'image/jpeg', 'image/png'];

        for( const image of files ) {
 
            const mimetype = image.mimetype;

            if( !extensions.includes(mimetype)) {
                return {
                    extensions,
                    isValid: false
                }
            }
        };

        return {
            extensions,
            isValid: true
        }

    }

}