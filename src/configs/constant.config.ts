import { config } from 'dotenv';
config();
export const NODE_ENV = process.env.NODE_ENV;

export const JWT_CONFIG = {
  SECRET: process.env.TOKEN_SECRET,
  EXPIRED_IN: process.env.TOKEN_EXPIRED_IN,
  SALT_ROUNDS: 12,
};

export const MYSQL_CONFIG = {
  hostMaster: process.env.MYSQL_MASTER_HOST || '',
  hostSlaves: process.env.MYSQL_SLAVES_HOST || '',
  host: process.env.MYSQL_HOST || '',
  username: process.env.MYSQL_USERNAME || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE_NAME || '',
  port: +process.env.MYSQL_PORT || 3306,
};

export const REDIS_CONFIG = {
  uri: process.env.CACHE_URI,
  day: 1, // cache 1 day, fix production can change this value or change key
};

export const DEFAULT_ADMIN_USER = {
  email: process.env.DEFAULT_ADMIN_USER,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
  name: process.env.DEFAULT_ADMIN_NAME || 'Administrator',
};

export const SEND_EMAIL_CONFIG = {
  sesAccessKey: process.env.SES_ACCESS_KEY,
  sesSecretKey: process.env.SES_SECRET_KEY,
  sesSendFrom: process.env.SES_SEND_FROM,
  awsRegion: process.env.SES_REGION,
  forgotPasswordMemberSubject: 'Password Reset',
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  subjectMail: process.env.SUBJECTMAIL,
};

export const MEMBER_CONFIG = {
  urlResetPassword: process.env.MEMBER_URL_RESET_PASSWORD,
};

export const UPLOAD_FILE_CONFIG = {
  s3AccessKey: process.env.S3_ACCESS_KEY,
  s3SecretKey: process.env.S3_SECRET_KEY,
};

export const GEN_PASSWORD_CONFIG = {
  NUMBER: true,
  LENGTH: 12,
};

export const AWS_CONFIG = {
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || '',
  SECRET_KEY: process.env.SECRET_KEY || '',
};

export const AWS_S3 = {
  REGION: process.env.REGION || '',
  BUCKET: process.env.BUCKET || '',
  CACHE_CONTROL: process.env.CACHE_CONTROL || '',
  ACL: process.env.ACL || '',
};

export const NOTIFICATION = {
  NOTIFICATION_URL: process.env.NOTIFICATION_URL || '',
};

export const CRON = {
  PATTERN: process.env.CRON_PATTERN || '0 * * * * *',
  MESSAGE: process.env.CRON_MESSAGE || 'chúc mừng sinh nhật',
};
