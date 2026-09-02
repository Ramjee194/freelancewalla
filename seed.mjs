import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://ramjeekumaryadav733:rk5BddiKkkh3vZxk@cluster0.c5cx9wm.mongodb.net/freelancewalla?retryWrites=true&w=majority';

const JobRoleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  description: String,
  responsibilities: [String],
  requirements: [String],
  workType: [String],
  workMode: String,
  location: String,
  salaryText: String,
  isSalaryVisible: Boolean,
  isActive: Boolean,
}, { timestamps: true });

const ReviewSchema = new mongoose.Schema({
  reviewType: String,
  name: String,
  roleOrCompany: String,
  rating: Number,
  reviewText: String,
  isSample: Boolean,
  isPublished: Boolean,
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  shortDescription: String,
  description: String,
  problem: String,
  solution: String,
  whatWeHandle: [String],
  whoItIsFor: [String],
  features: [String],
  icon: String,
  isActive: Boolean,
}, { timestamps: true });

const JobRole = mongoose.models.JobRole || mongoose.model('JobRole', JobRoleSchema);
const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

const defaultJobRoles = [
  {
    title: 'Sales Telecalling Executive',
    slug: 'sales-telecalling-executive',
    category: 'Sales & Telecalling',
    description: 'We are seeking energetic individuals with good communication skills for outbound telecalling operations. You will be responsible for contacting prospective leads, explaining business offerings, and scheduling appointments.',
    responsibilities: [
      'Make outbound calls to prospective leads based on provided lists and guidelines.',
      'Explain product/service features clearly and answer basic customer questions.',
      'Follow call scripts and record response details accurately in the reporting sheet.',
      'Identify interested prospects and schedule follow-ups or appointments.',
      'Maintain professional communication standards on every call.',
    ],
    requirements: [
      'Good oral communication skills in Hindi and/or English.',
      'Must have an active smartphone or laptop with a stable internet connection.',
      'Age 18 years or above.',
      'Ability to follow call scripts and instructions carefully.',
      'Prior telecalling experience is a plus, but freshers with clear voice tone are welcome.',
    ],
    workType: ['Part-Time', 'Full-Time'],
    workMode: 'Work From Home',
    location: 'Remote (India)',
    salaryText: 'Role-based fixed + performance incentives discussed during screening',
    isSalaryVisible: false,
    isActive: true,
  },
  {
    title: 'Customer Support Executive',
    slug: 'customer-support-executive',
    category: 'Customer Support',
    description: 'Join our customer support operations team to assist clients with inbound customer queries, ticket logging, order tracking, and general customer service.',
    responsibilities: [
      'Receive inbound customer calls/queries and assist them in a polite and helpful manner.',
      'Log customer issues accurately into the support system.',
      'Coordinate with internal teams to resolve escalated complaints.',
      'Provide accurate information regarding orders, services, and refund policies.',
      'Maintain high customer satisfaction by adhering to response guidelines.',
    ],
    requirements: [
      'Clear speaking and active listening skills.',
      'Smartphone or computer with high-speed internet.',
      'Age 18 years or above.',
      'Basic knowledge of operating web browsers and messaging tools.',
      'Patience and positive customer handling attitude.',
    ],
    workType: ['Part-Time', 'Full-Time'],
    workMode: 'Work From Home',
    location: 'Remote (India)',
    salaryText: 'Competitive monthly stipend / salary depending on shift duration',
    isSalaryVisible: false,
    isActive: true,
  },
  {
    title: 'Chat Support Executive',
    slug: 'chat-support-executive',
    category: 'Chat Support',
    description: 'We are hiring Chat Support Executives to assist website visitors via live chat. You will answer visitor questions, capture basic lead details, and guide users through navigation.',
    responsibilities: [
      'Monitor incoming website live chat requests and respond promptly.',
      'Assist visitors with general product, pricing, or account questions using pre-set responses.',
      'Collect contact details from interested leads and record them in the log.',
      'Escalate complex technical queries to the appropriate team lead.',
    ],
    requirements: [
      'Good written English and typing speed (minimum 30 WPM).',
      'Laptop or Desktop with reliable internet connection.',
      'Age 18 years or above.',
      'Attention to detail and ability to multi-task between chat sessions.',
    ],
    workType: ['Part-Time', 'Full-Time'],
    workMode: 'Remote',
    location: 'Remote (India)',
    salaryText: 'Standard hourly / monthly payout',
    isSalaryVisible: false,
    isActive: true,
  },
  {
    title: 'Email Support Executive',
    slug: 'email-support-executive',
    category: 'Email Support',
    description: 'Handle customer email inquiries and support tickets for clients. Focus on clear, error-free written communication and timely ticket resolution.',
    responsibilities: [
      'Read, categorize, and answer incoming customer emails following brand guidelines.',
      'Use response templates accurately while personalizing answers when necessary.',
      'Ensure response SLA limits are met for pending tickets.',
      'Keep log entries updated for recurring customer complaints.',
    ],
    requirements: [
      'Strong written English grammar and polite tone.',
      'Laptop or computer with internet.',
      'Age 18 years or above.',
      'Good comprehension skills and familiar with email tools (Gmail/Outlook).',
    ],
    workType: ['Part-Time', 'Full-Time'],
    workMode: 'Remote',
    location: 'Remote (India)',
    salaryText: 'Configured per candidate profile',
    isSalaryVisible: false,
    isActive: true,
  },
  {
    title: 'Data Entry Executive',
    slug: 'data-entry-executive',
    category: 'Data Entry',
    description: 'Looking for detail-oriented Data Entry Executives to manage spreadsheets, clean customer records, and input data accurately into management tools.',
    responsibilities: [
      'Transfer information from source documents into target spreadsheets or databases.',
      'Verify accuracy of data entries against physical or digital source documents.',
      'Perform data cleanup, remove duplicate records, and fix formatting errors.',
      'Submit completed daily data entry reports to the operations manager.',
    ],
    requirements: [
      'Basic typing skills and proficiency in Google Sheets or MS Excel.',
      'Computer or laptop with internet access.',
      'Age 18 years or above.',
      'High accuracy and attention to detail.',
    ],
    workType: ['Part-Time', 'Full-Time'],
    workMode: 'Remote',
    location: 'Remote (India)',
    salaryText: 'Task-based or monthly pay',
    isSalaryVisible: false,
    isActive: true,
  },
];

const defaultReviews = [
  {
    reviewType: 'CLIENT',
    name: 'TechSolutions India',
    roleOrCompany: 'B2B Software Agency',
    rating: 5,
    reviewText: 'FreelanceWalla helped us set up reliable outbound telecalling for our product demo follow-ups. The calling logs and updates were consistent and professional.',
    isSample: true,
    isPublished: true,
  },
  {
    reviewType: 'CLIENT',
    name: 'RetailEdge Commerce',
    roleOrCompany: 'E-commerce Brand',
    rating: 5,
    reviewText: 'Our online store needed support to manage peak-season email queries and data entry. The execution was quick and saved our team substantial operational time.',
    isSample: true,
    isPublished: true,
  },
  {
    reviewType: 'EMPLOYEE',
    name: 'Priya Sharma',
    roleOrCompany: 'Chat Support Executive',
    rating: 5,
    reviewText: 'Clear instructions and regular workflow guidance. Working as a Chat Support Executive remotely has been a smooth and flexible experience.',
    isSample: true,
    isPublished: true,
  },
  {
    reviewType: 'EMPLOYEE',
    name: 'Rahul Verma',
    roleOrCompany: 'Sales Telecalling Executive',
    rating: 4,
    reviewText: 'Submitting my online application was simple, and the screening process was straightforward. Good opportunity for part-time telecalling work from home.',
    isSample: true,
    isPublished: true,
  },
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    for (const r of defaultJobRoles) {
      await JobRole.updateOne({ slug: r.slug }, { $set: r }, { upsert: true });
    }
    console.log('Seeded JobRoles successfully.');

    for (const rev of defaultReviews) {
      await Review.updateOne(
        { name: rev.name, roleOrCompany: rev.roleOrCompany },
        { $set: rev },
        { upsert: true }
      );
    }
    console.log('Seeded Reviews successfully.');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding:', err);
    process.exit(1);
  }
}

run();
