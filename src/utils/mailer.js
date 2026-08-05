import { createTransporter } from '../config/mail.config.js';
import envConfig from '../config/env.config.js';
import logger from './logger.js';

/**
 * Sends an email using Nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @param {Array} [options.attachments] - Array of attachment objects
 */
export const sendMail = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: envConfig.smtp.mailFrom,
      to: to || envConfig.smtp.hrEmail,
      subject,
      text,
      html,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email dispatched successfully to ${mailOptions.to}. MessageId: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error.message}`, { error });
    throw error;
  }
};
