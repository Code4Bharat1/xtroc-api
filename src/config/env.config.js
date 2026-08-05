import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const requiredEnvVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

validateEnv();

const envConfig = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieExpiresInDays: parseInt(process.env.COOKIE_EXPIRES_IN_DAYS || '7', 10),
  adminName: process.env.ADMIN_NAME || 'XTORC Administrator',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@xtorc.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'AdminSecurePassword123!',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    mailFrom: process.env.MAIL_FROM || '"XTORC Careers" <no-reply@xtorc.com>',
    hrEmail: process.env.HR_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'admin@xtorc.com'
  }
};

export default envConfig;
