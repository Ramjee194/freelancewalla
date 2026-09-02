import mongoose, { Schema, Document, Model } from 'mongoose';
import { IApplication } from '@/types';

export interface IApplicationDocument extends Omit<IApplication, '_id'>, Document {}

const ApplicationSchema = new Schema<IApplicationDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    cityState: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18 },
    hasDevice: { type: Boolean, required: true },
    preferredWorkType: {
      type: String,
      required: true,
      enum: ['Full-Time', 'Part-Time', 'Work From Home'],
    },
    preferredRole: { type: String, required: true, trim: true },
    experienceLevel: {
      type: String,
      required: true,
      enum: ['Fresher', 'Less than 1 year', '1–2 years', '2+ years'],
    },
    languages: { type: String, required: true, trim: true },
    additionalInformation: { type: String, default: '' },
    status: {
      type: String,
      enum: ['New', 'Under Review', 'Contacted', 'Shortlisted', 'Rejected', 'Onboarding'],
      default: 'New',
    },
  },
  { timestamps: true }
);

const Application: Model<IApplicationDocument> =
  mongoose.models.Application || mongoose.model<IApplicationDocument>('Application', ApplicationSchema);

export default Application;
