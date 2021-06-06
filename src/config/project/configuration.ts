import { registerAs } from '@nestjs/config';

export default registerAs('project', () => ({
  url: process.env.PROJECT_URL,
  registerConfirmLink: process.env.REGISTER_CONFIRM_LINK,
}));
