import { AppData } from './application-data'
import { CreditCardData } from './credit-card-data'
import { EmailData } from './email-data'
import { TextData } from './text-data'
import { WebData } from './webpage-data'
import { WifiData } from './wifi-data'

export class User {
    id: string;
    
    name: string;
    email: string;
    passwordSHA512: string;

    aplication: AppData[];
    creditCard: CreditCardData[];
    emailData: EmailData[]
    textData: TextData[];
    webData: WebData[];
    wifiData: WifiData[];

    created_at: Date;
    updated_at: Date
}