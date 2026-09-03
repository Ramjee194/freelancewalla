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
 * Sends dual notifications for Client Contact Enquiries (Client + Admin)
 */
export async function sendContactInquiryEmails(inquiry: IContactInquiry) {
  try {
    // 1. Confirmation Email to Client / Business Contact
    const clientMailOptions = {
      from: `"FreelanceWalla Operations" <${user}>`,
      to: inquiry.email,
      subject: `Business Enquiry Received - FreelanceWalla [${inquiry.serviceRequired}]`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Enquiry Acknowledgement</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 15px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                  
                  <!-- HEADER -->
                  <tr>
                    <td style="background-color: #0f172a; padding: 28px 30px; text-align: center; border-bottom: 3px solid #2563eb;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; tracking-tight: -0.5px;">FreelanceWalla</h1>
                      <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px; font-weight: 500;">BPO Outsourcing • Telecalling • Support Operations</p>
                    </td>
                  </tr>

                  <!-- BODY CONTENT -->
                  <tr>
                    <td style="padding: 32px 30px;">
                      <h2 style="color: #0f172a; font-size: 19px; margin-top: 0; margin-bottom: 12px; font-weight: 700;">Dear ${inquiry.fullName},</h2>
                      <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                        Thank you for contacting <strong>FreelanceWalla</strong>. We have successfully registered your inquiry regarding <strong>${inquiry.serviceRequired}</strong>.
                      </p>
                      
                      <!-- ENQUIRY SUMMARY CARD -->
                      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 5px solid #2563eb; padding: 20px; margin: 24px 0; border-radius: 8px;">
                        <h3 style="margin: 0 0 14px 0; font-size: 15px; color: #1e3a8a; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Enquiry Details</h3>
                        <table width="100%" cellspacing="0" cellpadding="4" style="font-size: 13px; color: #334155;">
                          <tr><td style="width: 38%; font-weight: 600; color: #64748b;">Service Requested:</td><td style="font-weight: 700; color: #2563eb;">${inquiry.serviceRequired}</td></tr>
                          ${inquiry.companyName ? `<tr><td style="font-weight: 600; color: #64748b;">Company Name:</td><td style="font-weight: 600;">${inquiry.companyName}</td></tr>` : ''}
                          ${inquiry.expectedRequirement ? `<tr><td style="font-weight: 600; color: #64748b;">Scope / Capacity:</td><td>${inquiry.expectedRequirement}</td></tr>` : ''}
                          <tr><td style="font-weight: 600; color: #64748b; vertical-align: top;">Message Summary:</td><td style="line-height: 1.5;">${inquiry.message}</td></tr>
                        </table>
                      </div>

                      <!-- NEXT STEPS BOX -->
                      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                        <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #1d4ed8; font-weight: 700;">What Happens Next?</h4>
                        <p style="margin: 0; font-size: 13px; color: #1e40af; line-height: 1.5;">
                          Our operations manager is reviewing your operational needs and will contact you via phone (<strong>${inquiry.phone}</strong>) or email within <strong>24 business hours</strong> with a tailored proposal.
                        </p>
                      </div>

                      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;" />
                      
                      <!-- FOOTER -->
                      <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.6;">
                        Warm regards,<br />
                        <strong style="color: #0f172a;">FreelanceWalla Client Solutions Team</strong><br />
                        Website: <a href="https://freelancewalla.in" style="color: #2563eb; text-decoration: none; font-weight: 600;">freelancewalla.in</a> | Email: ${senderEmail}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // 2. Alert Email to Director / Business Ops Admin
    const directorMailOptions = {
      from: `"FreelanceWalla System" <${user}>`,
      to: directorEmail,
      subject: `🚨 NEW CLIENT ENQUIRY: ${inquiry.fullName} (${inquiry.serviceRequired})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
          <table role="presentation" width="100%" style="padding: 20px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #cbd5e1;">
                  <td style="background-color: #1e3a8a; padding: 20px; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 0.5px;">New Client BPO Lead Alert</h2>
                  </td>
                  <td style="padding: 24px;">
                    <table width="100%" cellspacing="0" cellpadding="8" style="font-size: 14px; border-collapse: collapse;">
                      <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; width: 35%; color: #475569;">Client Name:</td><td><strong>${inquiry.fullName}</strong></td></tr>
                      <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Service Needed:</td><td><span style="color: #2563eb; font-weight: bold;">${inquiry.serviceRequired}</span></td></tr>
                      <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; color: #475569;">Company:</td><td>${inquiry.companyName || 'N/A'}</td></tr>
                      <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Phone Number:</td><td><a href="tel:${inquiry.phone}" style="color: #2563eb; font-weight: bold;">${inquiry.phone}</a></td></tr>
                      <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; color: #475569;">Email Address:</td><td><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
                      <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Requirement Details:</td><td>${inquiry.expectedRequirement || 'N/A'}</td></tr>
                    </table>
                    <div style="margin-top: 18px; padding: 14px; background-color: #f1f5f9; border-radius: 6px; border-left: 4px solid #0284c7;">
                      <strong style="color: #0f172a; font-size: 13px;">Full Message Text:</strong>
                      <p style="margin: 6px 0 0 0; font-size: 13px; color: #334155; white-space: pre-line;">${inquiry.message}</p>
                    </div>
                  </td>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(directorMailOptions),
    ]);
    console.log(`[Mailer] Contact inquiry notification emails sent successfully for ${inquiry.fullName}.`);
  } catch (error) {
    console.error('Error sending contact inquiry emails via Nodemailer:', error);
  }
}

/**
 * Sends dual notifications for Job Applications (Candidate + Director/HR Admin)
 */
export async function sendApplicationEmails(application: Partial<IApplication>) {
  try {
    // 1. Executive Confirmation Email to Candidate / Applicant
    const applicantMailOptions = {
      from: `"FreelanceWalla Recruitment" <${user}>`,
      to: application.email,
      subject: `Application Acknowledged - ${application.preferredRole} | FreelanceWalla`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Received</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 15px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #cbd5e1;">
                  
                  <!-- HEADER -->
                  <tr>
                    <td style="background-color: #0f172a; padding: 28px 30px; text-align: center; border-bottom: 3px solid #16a34a;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800;">FreelanceWalla</h1>
                      <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px; font-weight: 500;">Work Opportunities & Remote Talent Network</p>
                    </td>
                  </tr>

                  <!-- BODY CONTENT -->
                  <tr>
                    <td style="padding: 32px 30px;">
                      <h2 style="color: #0f172a; font-size: 19px; margin-top: 0; margin-bottom: 12px; font-weight: 700;">Dear ${application.fullName},</h2>
                      <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                        Thank you for applying to <strong>FreelanceWalla</strong>. Your profile submission for the position of <strong>${application.preferredRole}</strong> has been safely recorded in our recruitment database.
                      </p>
                      
                      <!-- APPLICATION SUMMARY CARD -->
                      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 5px solid #16a34a; padding: 20px; margin: 24px 0; border-radius: 8px;">
                        <h3 style="margin: 0 0 14px 0; font-size: 14px; color: #14532d; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Summary of Your Application</h3>
                        <table width="100%" cellspacing="0" cellpadding="5" style="font-size: 13px; color: #334155;">
                          <tr><td style="width: 40%; font-weight: 600; color: #64748b;">Position Applied:</td><td style="font-weight: 700; color: #0f172a;">${application.preferredRole}</td></tr>
                          <tr><td style="font-weight: 600; color: #64748b;">Work Mode:</td><td style="font-weight: 600; color: #16a34a;">${application.preferredWorkType}</td></tr>
                          <tr><td style="font-weight: 600; color: #64748b;">Experience Level:</td><td>${application.experienceLevel}</td></tr>
                          <tr><td style="font-weight: 600; color: #64748b;">Location / State:</td><td>${application.cityState}</td></tr>
                          <tr><td style="font-weight: 600; color: #64748b;">Languages Known:</td><td>${application.languages}</td></tr>
                        </table>
                      </div>

                      <!-- NEXT STEPS TIMELINE -->
                      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
                        <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #166534; font-weight: 700;">What Happens Next?</h4>
                        <ol style="margin: 0; padding-left: 18px; font-size: 13px; color: #15803d; line-height: 1.6;">
                          <li><strong>Profile Screening:</strong> Our HR recruitment team is screening your qualifications.</li>
                          <li><strong>Telephonic Contact:</strong> Shortlisted candidates will be contacted via phone (<strong>${application.phone}</strong>) or email.</li>
                          <li><strong>Orientation & Onboarding:</strong> Basic process guidelines and shift timing allocations will be communicated.</li>
                        </ol>
                      </div>

                      <!-- APPLICANT SAFETY WARNING -->
                      <div style="background-color: #fffbe6; border: 1px solid #ffe58f; padding: 14px 16px; border-radius: 8px; font-size: 12px; color: #856404; margin-bottom: 24px; line-height: 1.5;">
                        <strong style="color: #533f03;">Important Applicant Safety Advisory:</strong><br />
                        FreelanceWalla <u>never</u> charges registration fees or training payments from job applicants. Never share bank PINs, OTPs, or passwords with anyone claiming to represent FreelanceWalla.
                      </div>

                      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;" />
                      
                      <!-- FOOTER -->
                      <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.6;">
                        Best regards,<br />
                        <strong style="color: #0f172a;">FreelanceWalla HR & Recruitment Operations</strong><br />
                        Website: <a href="https://freelancewalla.in" style="color: #2563eb; text-decoration: none; font-weight: 600;">freelancewalla.in</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // 2. Alert Email to Director / HR Recruitment Lead
    const directorMailOptions = {
      from: `"FreelanceWalla Recruitment Portal" <${user}>`,
      to: directorEmail,
      subject: `📋 NEW CANDIDATE PROFILE: ${application.fullName} - ${application.preferredRole}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
          <table role="presentation" width="100%" style="padding: 20px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  
                  <!-- HEADER -->
                  <tr style="background-color: #0f172a; color: #ffffff;">
                    <td style="padding: 20px 24px;">
                      <h2 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">New Candidate Application Received</h2>
                      <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">Candidate Profile Alert</p>
                    </td>
                  </tr>

                  <!-- CANDIDATE METRICS TABLE -->
                  <tr>
                    <td style="padding: 24px;">
                      <table width="100%" cellspacing="0" cellpadding="8" style="font-size: 13px; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; width: 40%; color: #475569;">Candidate Name:</td><td><strong style="color: #0f172a; font-size: 15px;">${application.fullName}</strong></td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Role Applied:</td><td><span style="color: #2563eb; font-weight: bold; font-size: 14px;">${application.preferredRole}</span></td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; color: #475569;">Work Type:</td><td><span style="background-color: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${application.preferredWorkType}</span></td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Phone Number:</td><td><a href="tel:${application.phone}" style="color: #2563eb; font-weight: bold; font-size: 14px;">${application.phone}</a></td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; color: #475569;">Email Address:</td><td><a href="mailto:${application.email}" style="color: #2563eb;">${application.email}</a></td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Location (City/State):</td><td>${application.cityState}</td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; color: #475569;">Age:</td><td>${application.age} years</td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Device & Internet Access:</td><td><strong style="color: ${application.hasDevice ? '#16a34a' : '#dc2626'};">${application.hasDevice ? 'YES (Smartphone/Laptop)' : 'NO'}</strong></td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;"><td style="font-weight: bold; color: #475569;">Experience:</td><td>${application.experienceLevel}</td></tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="font-weight: bold; color: #475569;">Languages Known:</td><td><strong>${application.languages}</strong></td></tr>
                      </table>

                      ${application.additionalInformation ? `
                        <div style="margin-top: 20px; padding: 14px; background-color: #f1f5f9; border-radius: 8px; border-left: 4px solid #2563eb;">
                          <strong style="color: #0f172a; font-size: 13px;">Candidate Additional Notes:</strong>
                          <p style="margin: 6px 0 0 0; font-size: 13px; color: #334155; white-space: pre-line;">${application.additionalInformation}</p>
                        </div>
                      ` : ''}

                      <!-- ACTION BUTTONS -->
                      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
                        <a href="tel:${application.phone}" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: bold; margin-right: 10px;">Call Candidate Now</a>
                        <a href="mailto:${application.email}?subject=FreelanceWalla%20Application%20Update%20-%20${encodeURIComponent(application.preferredRole || '')}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: bold;">Reply via Email</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    console.log(`[Mailer] Sending professional application notification emails for ${application.fullName}...`);
    await Promise.all([
      transporter.sendMail(applicantMailOptions),
      transporter.sendMail(directorMailOptions),
    ]);
    console.log(`[Mailer] Professional application emails sent successfully for ${application.fullName}!`);
  } catch (error) {
    console.error('[Mailer] Error sending application emails via Nodemailer:', error);
  }
}

