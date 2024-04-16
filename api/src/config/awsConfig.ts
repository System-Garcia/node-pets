import dotenv from 'dotenv';

dotenv.config();

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;
const FIXED_IMAGE_URL = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/1712866094162_pet.jpg`;

export const awsConfig = {
  bucketName: AWS_BUCKET_NAME,
  region: AWS_REGION,
  fixedImageUrl: FIXED_IMAGE_URL,
};
