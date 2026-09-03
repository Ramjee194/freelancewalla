import { sendApplicationEmails } from '../src/lib/mailer';

async function runTest() {
  console.log('Testing sendApplicationEmails...');
  await sendApplicationEmails({
    fullName: 'Krishna Kumar (Test)',
    email: 'ramjeekumaryadav733@gmail.com',
    phone: '9876543210',
    cityState: 'Jaipur, Rajasthan',
    age: 24,
    hasDevice: true,
    preferredWorkType: 'Work From Home',
    preferredRole: 'Customer Support Executive',
    experienceLevel: 'Fresher',
    languages: 'Hindi, English',
    additionalInformation: 'Testing job application email notification system.',
    status: 'New',
  });
  console.log('Finished sendApplicationEmails test!');
}

runTest();
