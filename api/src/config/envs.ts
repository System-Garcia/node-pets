import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    POSTGRES_URL: get('POSTGRES_URL').required().asString(),
    POSTGRES_DB_NAME: get('POSTGRES_DB_NAME').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    AWS_ACCESS_KEY_ID: get('AWS_ACCESS_KEY_ID').required().asString(),
    AWS_SECRET_ACCESS_KEY: get('AWS_SECRET_ACCESS_KEY').required().asString(),
    AWS_BUCKET_NAME: get('AWS_BUCKET_NAME').required().asString(),
    AWS_REGION: get('AWS_REGION').required().asString(),
    SEND_EMAIL: get('SEND_EMAIL').required().default('false').asBool(),
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
};