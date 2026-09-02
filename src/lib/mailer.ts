import nodemailer from 'nodemailer';
import { IContactInquiry, IApplication } from '@/types';

const host = process.env.MAIL_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.MAIL_PORT || '465', 10);
const user = process.env.MAIL_USER || 'ramjeekumaryadav733@gmail.com';
// Remove any accidental spaces in app password string
const pass = (process.env.MAIL_PASS || 'azsl vspn pqht urgw').replace(/\s+/g, '');

const directorEmail = process.env.DIRECTOR_EMAIL || 'ramjeekumaryadav733@gmail.com';
const senderEmail = process.env.SENDER_EMAIL || 'info@freelancewalla.in';

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465, false for other ports
  auth: {
    user,
    pass,
  },
});

/**
 * Sends dual notifications for Client Contact Enquiries
 */
export async function sendContactInquiryEmails(inquiry: IContactInquiry) {
  try {
    // 1. Email to the Client / User
    const clientMailOptions = {
      from: `"FreelanceWalla Support" <${user}>`,
      to: inquiry.email,
      subject: `Enquiry Received - FreelanceWalla [${inquiry.serviceRequired}]`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">FreelanceWalla</h1>
            <p style="color: #94a3b8; margin: 5px 0 0; font-size: 14px;">Reliable BPO & Freelance Services</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">Dear ${inquiry.fullName},</h2>
            <p>Thank you for reaching out to <strong>FreelanceWalla</strong>. We have received your business enquiry regarding <strong>${inquiry.serviceRequired}</strong>.</p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin: 0 0 10px; font-size: 15px; color: #1e3a8a;">Enquiry Summary</h3>
              <p style="margin: 4px 0;"><strong>Service Required:</strong> ${inquiry.serviceRequired}</p>
              ${inquiry.companyName ? `<p style="margin: 4px 0;"><strong>Company Name:</strong> ${inquiry.companyName}</p>` : ''}
              ${inquiry.expectedRequirement ? `<p style="margin: 4px 0;"><strong>Expected Requirement:</strong> ${inquiry.expectedRequirement}</p>` : ''}
              <p style="margin: 4px 0;"><strong>Message:</strong> ${inquiry.message}</p>
            </div>

            <p>Our operational team is reviewing your requirements and will get back to you via phone (<strong>${inquiry.phone}</strong>) or email within 24 business hours.</p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 13px; color: #64748b; margin: 0;">
              Best regards,<br />
              <strong>FreelanceWalla Business Ops Team</strong><br />
              Website: <a href="https://freelancewalla.in" style="color: #2563eb;">freelancewalla.in</a> | Email: ${senderEmail}
            </p>
          </div>
        </div>
      `,
    };

    // 2. Email to the Director / Admin
    const directorMailOptions = {
      from: `"FreelanceWalla System" <${user}>`,
      to: directorEmail,
      subject: `🚨 NEW CLIENT ENQUIRY: ${inquiry.fullName} (${inquiry.serviceRequired})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 8px;">
          <div style="background-color: #2563eb; padding: 16px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">New BPO Client Enquiry Received</h2>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; width: 40%;">Full Name:</td><td style="padding: 8px;">${inquiry.fullName}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${inquiry.companyName || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Service Requested:</td><td style="padding: 8px; font-weight: bold; color: #2563eb;">${inquiry.serviceRequired}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Requirement Details:</td><td style="padding: 8px;">${inquiry.expectedRequirement || 'N/A'}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 12px; background-color: #f1f5f9; border-radius: 6px;">
              <strong>Message Details:</strong>
              <p style="margin: 6px 0 0; white-space: pre-line;">${inquiry.message}</p>
            </div>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(directorMailOptions),
    ]);
  } catch (error) {
    console.error('Error sending contact inquiry emails via Nodemailer:', error);
  }
}

/**
 * Sends dual notifications for Job Applications
 */
export async function sendApplicationEmails(application: IApplication) {
  try {
    // 1. Email to the Candidate / Applicant
    const applicantMailOptions = {
      from: `"FreelanceWalla Recruitment" <${user}>`,
      to: application.email,
      subject: `Application Received - FreelanceWalla [${application.preferredRole}]`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">FreelanceWalla</h1>
            <p style="color: #94a3b8; margin: 5px 0 0; font-size: 14px;">Work Opportunities & Freelance Roles</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">Dear ${application.fullName},</h2>
            <p>Thank you for submitting your application to <strong>FreelanceWalla</strong> for the position of <strong>${application.preferredRole}</strong>.</p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #16a34a; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin: 0 0 10px; font-size: 15px; color: #14532d;">Application Status & Details</h3>
              <p style="margin: 4px 0;"><strong>Application ID:</strong> ${application._id || 'Submitted'}</p>
              <p style="margin: 4px 0;"><strong>Role Applied:</strong> ${application.preferredRole}</p>
              <p style="margin: 4px 0;"><strong>Work Type:</strong> ${application.preferredWorkType}</p>
              <p style="margin: 4px 0;"><strong>Experience Level:</strong> ${application.experienceLevel}</p>
            </div>

            <div style="background-color: #fffbe6; border: 1px solid #ffe58f; padding: 12px; border-radius: 6px; font-size: 13px; color: #856404; margin-bottom: 20px;">
              <strong>Important Notice:</strong> Submission of an application does not guarantee employment or selection. Never share bank PINs, OTPs, or passwords with anyone. FreelanceWalla never asks for registration fees from applicants.
            </div>

            <p>Our screening team will review your qualifications. If shortlisted, a recruitment representative will contact you via phone (<strong>${application.phone}</strong>) or email to discuss next steps.</p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 13px; color: #64748b; margin: 0;">
              Regards,<br />
              <strong>FreelanceWalla HR Team</strong><br />
              Website: <a href="https://freelancewalla.in" style="color: #2563eb;">freelancewalla.in</a>
            </p>
          </div>
        </div>
      `,
    };

    // 2. Email to the Director / HR Admin
    const directorMailOptions = {
      from: `"FreelanceWalla Portal" <${user}>`,
      to: directorEmail,
      subject: `📋 NEW CANDIDATE APPLICATION: ${application.fullName} - ${application.preferredRole}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 8px;">
          <div style="background-color: #0f172a; padding: 16px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">New Applicant Profile Submitted</h2>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; width: 40%;">Candidate Name:</td><td style="padding: 8px;">${application.fullName}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Role Applied:</td><td style="padding: 8px; font-weight: bold; color: #2563eb;">${application.preferredRole}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${application.email}">${application.email}</a></td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Phone Number:</td><td style="padding: 8px;"><a href="tel:${application.phone}">${application.phone}</a></td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Location (City/State):</td><td style="padding: 8px;">${application.cityState}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Age:</td><td style="padding: 8px;">${application.age} years</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Smartphone/Laptop:</td><td style="padding: 8px;">${application.hasDevice ? 'YES' : 'NO'}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Work Type Pref:</td><td style="padding: 8px;">${application.preferredWorkType}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Experience:</td><td style="padding: 8px;">${application.experienceLevel}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Languages:</td><td style="padding: 8px;">${application.languages}</td></tr>
            </table>
            ${application.additionalInformation ? `
              <div style="margin-top: 16px; padding: 12px; background-color: #f1f5f9; border-radius: 6px;">
                <strong>Additional Candidate Notes:</strong>
                <p style="margin: 6px 0 0; white-space: pre-line;">${application.additionalInformation}</p>
              </div>
            ` : ''}
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(applicantMailOptions),
      transporter.sendMail(directorMailOptions),
    ]);
  } catch (error) {
    console.error('Error sending application emails via Nodemailer:', error);
  }
}
