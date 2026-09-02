import mongoose, { Schema, Document, Model } from 'mongoose';
import { IContactInquiry } from '@/types';

export interface IContactInquiryDocument extends Omit<IContactInquiry, '_id'>, Document {}

const ContactInquirySchema = new Schema<IContactInquiryDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, default: '', trim: true },
    serviceRequired: { type: String, required: true, trim: true },
    expectedRequirement: { type: String, default: '', trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['New', 'Reviewed', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

const ContactInquiry: Model<IContactInquiryDocument> =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiryDocument>('ContactInquiry', ContactInquirySchema);

export default ContactInquiry;
