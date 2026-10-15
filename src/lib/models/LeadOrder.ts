import mongoose, { Schema, Document, Model } from 'mongoose';
import { ILeadOrder } from '@/types';

export interface ILeadOrderDocument extends Omit<ILeadOrder, '_id'>, Document {}

const LeadOrderSchema = new Schema<ILeadOrderDocument>(
  {
    agencyId: { type: String, required: true, index: true },
    agencyEmail: { type: String, required: true, lowercase: true },
    agencyCompanyName: { type: String, required: true },
    planName: {
      type: String,
      required: true,
      enum: ['Starter (5 Leads)', 'Growth (10 Leads)', 'Pro Agency (15 Leads)'],
    },
    amount: { type: Number, required: true },
    creditsGiven: { type: Number, required: true },
    cashfreeOrderId: { type: String },
    cashfreePaymentId: { type: String },
    disclaimerAccepted: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILED', 'PENDING'],
      default: 'PENDING',
      index: true,
    },
    allocatedLeadIds: [{ type: String }],
  },
  { timestamps: true }
);

const LeadOrder: Model<ILeadOrderDocument> =
  mongoose.models.LeadOrder || mongoose.model<ILeadOrderDocument>('LeadOrder', LeadOrderSchema);

export default LeadOrder;
