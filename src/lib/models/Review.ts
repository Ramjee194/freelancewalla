import mongoose, { Schema, Document, Model } from 'mongoose';
import { IReview } from '@/types';

export interface IReviewDocument extends Omit<IReview, '_id'>, Document {}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    reviewType: { type: String, required: true, enum: ['CLIENT', 'EMPLOYEE'] },
    name: { type: String, required: true, trim: true },
    roleOrCompany: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    reviewText: { type: String, required: true, trim: true },
    isSample: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Review: Model<IReviewDocument> =
  mongoose.models.Review || mongoose.model<IReviewDocument>('Review', ReviewSchema);

export default Review;
