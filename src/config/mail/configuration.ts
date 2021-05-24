import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  registerFrom: process.env.MAIL_REGISTER_FROM,
  registerSubject: process.env.MAIL_REGISTER_SUBJECT,
}));
