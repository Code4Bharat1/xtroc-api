import nodemailer from 'nodemailer';
import envConfig from './env.config.js';

export const createTransporter = () => {
  return nodemailer.createTransport({
    host: envConfig.smtp.host,
    port: envConfig.smtp.port,
    secure: envConfig.smtp.secure,
    auth: {
      user: envConfig.smtp.user,
      pass: envConfig.smtp.pass
    }
  });
};
