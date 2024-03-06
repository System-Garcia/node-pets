import { SendMailOptions } from "../interfaces/send-mail-options.interface";


export abstract class EmailService {
    abstract sendEmail(options: SendMailOptions): Promise<boolean>;
}