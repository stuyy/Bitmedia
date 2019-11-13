require('dotenv').config();
const nodemailer = require('nodemailer');
/**
 * Wrapper class to send emails.
 */
class MailTransporter {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
    }
    async sendMail(opts = {}) {
        try {
            await this.transporter.sendMail({
                to: opts.receiver,
                subject: opts.subject,
                text: opts.message
            });
            console.log("Sent.");
        }
        catch(err) {
            console.log(err);
        }
    }
}

module.exports = MailTransporter