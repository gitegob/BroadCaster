import { createTransport } from 'nodemailer';
import { config } from 'dotenv';

config();

// Create the transporter with the required configuration for Gmail
// change the user and pass !
const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PWD,
  },
});

export default transporter;
