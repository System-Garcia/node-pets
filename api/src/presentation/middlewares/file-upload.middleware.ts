import { NextFunction, Request, Response } from "express";


export class FileUploadMiddleware {
     /**
     * Middleware to ensure that files are present in the request under the 'file' key.
     * It first checks if the files exist using a helper function. If not, it responds with an error.
     * If files do exist, it converts them to an array (if not already) and validates their extensions.
     * Only files with specific image extensions are allowed.
     * @param req - The request object from Express.
     * @param res - The response object from Express.
     * @param next - The next middleware function in the stack.
     */
    static containFiles = (req: Request, res: Response, next: NextFunction) => {

        if( !this.filesExist(req) ) {
            return res.status(400).json( { error : 'No files were selected'});
        }
        
        req.body.files = this.convertFilesToArray(req.files!.file);

        const { isValid, extensions } = this.validateImagesExtension( req.body.files );

        if (!isValid) return res.status(400).json({ error: `Invalid extension. Only ${extensions.join(',')} are accepted.`})
        
        next();
    }

    /**
     * Optional middleware for handling file uploads in cases where files might not be present.
     * If files are present, it ensures they exist under the 'file' key, converts them to an array, and validates their extensions.
     * It's designed for flexibility, allowing it to be used in scenarios such as user updates where files are optional.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function in the middleware chain.
     */
    static objectToArray = (req: Request, res: Response, next: NextFunction) => {

        if (req.files) {

            if( !this.filesExist(req) ) {
                return res.status(400).json( { error : 'No files were selected'});
            }

            req.body.files = this.convertFilesToArray(req.files.file);

            const { isValid, extensions } = this.validateImagesExtension( req.body.files );
            if (!isValid) return res.status(400).json({ error: `Invalid extension. Only ${extensions.join(',')} are accepted.`})
        };

        next();
    };

     /**
     * Helper method to convert the file or files into an array format.
     * This ensures uniform handling whether a single file or multiple files are uploaded.
     * @param files - The file(s) uploaded in the request.
     * @returns An array of file objects.
     */
    private static convertFilesToArray = (files: any): any[] => {
       return !Array.isArray(files) ? [ files ] : files
    }

    /**
     * Validates the extension of each file against a predefined list of allowed image types.
     * @param files - An array of file objects to validate.
     * @returns An object containing the valid status and the list of allowed extensions.
     */
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

    /**
     * Checks if the required 'file' key exists within the request's files.
     * @param req - The request object.
     * @returns A boolean indicating whether the 'file' key exists and is not empty.
     */
    private static filesExist = (req: Request): boolean => {
        return !( !req.files || Object.keys(req.files).length === 0 || !req.files.file)
    }

}