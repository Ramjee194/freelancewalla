import mongoose, { Schema, Document, Model } from 'mongoose';
import { IAgencyUser } from '@/types';

export interface IAgencyUserDocument extends Omit<IAgencyUser, '_id'>, Document {}

const AgencyUserSchema = new Schema<IAgencyUserDocument>(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    companyName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    portfolioWebsite: { type: String, trim: true },
    categories: [{ type: String }],

    // Admin Verification & Account Unlock
    isVerifiedByAdmin: { type: Boolean, default: false, index: true },

    // Lead unlock credits (5, 10, 15 etc.)
    creditsBalance: { type: Number, default: 0 },
    totalCreditsPurchased: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ['Active', 'Pending Verification', 'Suspended'],
      default: 'Pending Verification',
    },
  },
  { timestamps: true }
);

const AgencyUser: Model<IAgencyUserDocument> =
  mongoose.models.AgencyUser || mongoose.model<IAgencyUserDocument>('AgencyUser', AgencyUserSchema);

export default AgencyUser;
