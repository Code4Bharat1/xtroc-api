import { sendMail } from '../../utils/mailer.js';
import ApiError from '../../utils/apiError.js';
import logger from '../../utils/logger.js';
import envConfig from '../../config/env.config.js';

class ContactService {
  /**
   * Process contact form enquiry and dispatch email notification
   * @param {Object} enquiryData - Contact details from request body
   */
  async processContactEnquiry(enquiryData) {
    const { name, email, phone, subject, company, message } = enquiryData;

    const emailSubject = `[Website Enquiry] ${subject || 'New Contact Request'} - ${name}`;

    const plainTextBody = `
New Website Enquiry Received - XTORC

Sender Information:
-------------------
• Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not Provided'}
• Company: ${company || 'Not Provided'}
• Subject: ${subject || 'General Enquiry'}

Message Details:
----------------
${message}

-------------------
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
    `.trim();

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #222222; background-color: #f4f6f9; margin: 0; padding: 20px; }
          .card { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08); border: 1px solid #e1e4e8; }
          .header { background: #d01a1a; color: #ffffff; padding: 24px; text-align: center; }
          .header h2 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 28px; }
          .section-title { font-size: 15px; font-weight: 700; color: #d01a1a; border-bottom: 2px solid #f1f3f5; padding-bottom: 6px; margin-top: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
          .field-row { margin-bottom: 10px; display: flex; font-size: 14px; }
          .label { font-weight: 600; width: 140px; color: #555555; }
          .value { flex: 1; color: #111111; }
          .message-box { background: #fafafa; border-left: 4px solid #d01a1a; padding: 16px; margin-top: 12px; font-size: 14px; color: #333333; border-radius: 4px; line-height: 1.7; }
          .footer { background: #f8f9fa; text-align: center; padding: 14px; font-size: 12px; color: #888888; border-top: 1px solid #e1e4e8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>XTORC Website Enquiry</h2>
            <p>New customer inquiry received via website contact form</p>
          </div>
          <div class="content">
            <div class="section-title">Customer Information</div>
            <div class="field-row"><span class="label">Full Name:</span><span class="value"><strong>${name}</strong></span></div>
            <div class="field-row"><span class="label">Email Address:</span><span class="value"><a href="mailto:${email}" style="color: #d01a1a;">${email}</a></span></div>
            <div class="field-row"><span class="label">Phone Number:</span><span class="value">${phone ? `<a href="tel:${phone}" style="color: #111;">${phone}</a>` : '<em>Not Provided</em>'}</span></div>
            ${company ? `<div class="field-row"><span class="label">Company Name:</span><span class="value">${company}</span></div>` : ''}
            ${subject ? `<div class="field-row"><span class="label">Subject:</span><span class="value">${subject}</span></div>` : ''}

            <div class="section-title">Requirement / Message</div>
            <div class="message-box">${message.replace(/\n/g, '<br/>')}</div>
          </div>
          <div class="footer">
            Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST • XTORC Industrial Solutions
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await sendMail({
        to: envConfig.smtp.hrEmail,
        subject: emailSubject,
        text: plainTextBody,
        html: htmlBody
      });

      logger.info(`Contact enquiry from ${email} (${name}) processed and email dispatched.`);
      return { name, email, subject: subject || 'General Enquiry' };
    } catch (mailError) {
      logger.error(`Failed to send contact enquiry email for ${email}: ${mailError.message}`, {
        sender: name,
        error: mailError
      });
      throw new ApiError(500, 'Your enquiry was received, but there was an issue sending the notification email. Please reach out to us directly or try again.');
    }
  }
}

export default new ContactService();
