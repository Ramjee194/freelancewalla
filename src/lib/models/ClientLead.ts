import mongoose, { Schema, Document, Model } from 'mongoose';
import { IClientLead } from '@/types';

export interface IClientLeadDocument extends Omit<IClientLead, '_id'>, Document {}

const ClientLeadSchema = new Schema<IClientLeadDocument>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Web Development', 'App Development', 'SEO Services', 'AI & Automation'],
    },
    budgetRange: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true, trim: true },
    cityLocation: { type: String, required: true, trim: true },

    // Sensitive Client Contact Details (Revealed only to the unlocking agency)
    clientName: { type: String, required: true, trim: true },
    clientPhone: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, trim: true },
    clientFullAddress: { type: String, required: true, trim: true },

    // Exclusivity logic: Every client lead is assigned to at most 1 agency!
    isAllocated: { type: Boolean, default: false, index: true },
    allocatedToAgencyId: { type: String, default: null, index: true },
    allocatedToAgencyName: { type: String, default: null },
    allocatedAt: { type: Date, default: null },

    status: {
      type: String,
      enum: ['Available', 'Allocated', 'Archived'],
      default: 'Available',
      index: true,
    },
  },
  { timestamps: true }
);

const ClientLead: Model<IClientLeadDocument> =
  mongoose.models.ClientLead || mongoose.model<IClientLeadDocument>('ClientLead', ClientLeadSchema);

export default ClientLead;
