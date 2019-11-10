import Nexmo from 'nexmo';
import { config } from 'dotenv';

config();

const nexmo = new Nexmo({
  apiKey: process.env.api_secret,
  apiSecret: process.env.api_key,
},
{ debug: true });

export default nexmo;
