import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config();


sgMail.setApiKey(process.env.sendgrid_api_key);


export default sgMail;
