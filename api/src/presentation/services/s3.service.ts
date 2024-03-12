import AWS from 'aws-sdk';
import { UploadedFile  } from 'express-fileupload'

interface S3Config {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucketName: string;
}

export class S3Service {

    private s3: AWS.S3;
    private bucketName: string;

    constructor(config: S3Config) {
        AWS.config.update({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            region: config.region
        });

        this.s3 = new AWS.S3();
        this.bucketName = config.bucketName;
    }

    async uploadImage(file: UploadedFile): Promise<string> {
        const uploadParams = {
            Bucket: this.bucketName,
            Key: `${Date.now()}_${file.name}`,
            Body: file.data,
            ContentType: file.mimetype,
        };

        try {
            const { Location } = await this.s3.upload(uploadParams).promise();
            return Location;
        } catch (error) { 
            throw error;
        }
    }

    async deleteImage(url: string): Promise<{ success: boolean; error?: Error}> {

        const key = url.split('/').at(-1);

        if(!key) {
            throw new Error('Invalid image URL for deletion');
        };

        const deleteParams = {
            Bucket: this.bucketName,
            Key: key,
        };

        try {
            await this.s3.deleteObject(deleteParams).promise();

            return { success: true };
        } catch (error) {
            const isError = error instanceof Error;
            return { success: false, error: isError ? error: new Error('Error desconocido al borrar la imagen') };
        }

    }
}