import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Review from '@/lib/models/Review';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { reviewType, name, roleOrCompany, rating, reviewText, isSample, isPublished } = body;

    if (!reviewType || !name || !roleOrCompany || !reviewText) {
      return NextResponse.json({ error: 'Missing required review fields.' }, { status: 400 });
    }

    await connectToDatabase();
    const newReview = await Review.create({
      reviewType,
      name,
      roleOrCompany,
      rating: rating || 5,
      reviewText,
      isSample: !!isSample,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    await connectToDatabase();
    const updated = await Review.findByIdAndUpdate(_id, updateData, { new: true });

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    await connectToDatabase();
    await Review.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Review deleted.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
