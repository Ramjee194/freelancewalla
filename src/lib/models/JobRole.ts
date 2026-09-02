import mongoose, { Schema, Document, Model } from 'mongoose';
import { IJobRole } from '@/types';

export interface IJobRoleDocument extends Omit<IJobRole, '_id'>, Document {}

const JobRoleSchema = new Schema<IJobRoleDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Sales & Telecalling',
        'Customer Support',
        'Chat Support',
        'Email Support',
        'Data Entry',
        'Lead Generation',
        'Back Office Support',
        'Virtual Assistance',
      ],
    },
    description: { type: String, required: true },
    responsibilities: [{ type: String, required: true }],
    requirements: [{ type: String, required: true }],
    workType: [{ type: String, enum: ['Full-Time', 'Part-Time', 'Flexible'] }],
    workMode: { type: String, enum: ['Work From Home', 'Remote', 'On-Site', 'Hybrid'], default: 'Work From Home' },
    location: { type: String, default: 'India (Remote / WFH)' },
    salaryText: { type: String, default: '' },
    isSalaryVisible: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const JobRole: Model<IJobRoleDocument> =
  mongoose.models.JobRole || mongoose.model<IJobRoleDocument>('JobRole', JobRoleSchema);

export default JobRole;
