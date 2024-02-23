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
            ContentType: 'png'
        };

        try {
            const { Location } = await this.s3.upload(uploadParams).promise();
            return Location;
        } catch (error) { 
            throw error;
        }
    }
}