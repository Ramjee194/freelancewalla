import nodemailer from 'nodemailer';

const host = process.env.MAIL_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.MAIL_PORT || '465', 10);
const user = process.env.MAIL_USER || 'ramjeekumaryadav733@gmail.com';
const pass = (process.env.MAIL_PASS || 'azsl vspn pqht urgw').replace(/\s+/g, '');
const directorEmail = process.env.DIRECTOR_EMAIL || 'ramjeekumaryadav733@gmail.com';

console.log('Testing Email Transport with configuration:');
console.log('Host:', host);
console.log('Port:', port);
console.log('User:', user);
console.log('Pass length:', pass.length);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

async function testEmail() {
  try {
    console.log('Verifying connection to SMTP server...');
    await transporter.verify();
    console.log('SMTP connection verified successfully!');

    console.log('Sending test email to:', directorEmail);
    const info = await transporter.sendMail({
      from: `"FreelanceWalla Test" <${user}>`,
      to: directorEmail,
      subject: 'Test Email Notification - FreelanceWalla',
      text: 'This is a test notification email from FreelanceWalla.',
    });

    console.log('Email sent successfully! MessageId:', info.messageId);
  } catch (error) {
    console.error('Error in email sending test:', error);
  }
}

testEmail();
