import mongoose, { Schema, Document, Model } from 'mongoose';
import { IService } from '@/types';

export interface IServiceDocument extends Omit<IService, '_id'>, Document {}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    problem: { type: String, required: true, trim: true },
    solution: { type: String, required: true, trim: true },
    whatWeHandle: [{ type: String, required: true }],
    whoItIsFor: [{ type: String, required: true }],
    features: [{ type: String, required: true }],
    icon: { type: String, default: 'Headphones' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service: Model<IServiceDocument> =
  mongoose.models.Service || mongoose.model<IServiceDocument>('Service', ServiceSchema);

export default Service;
