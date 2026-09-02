import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import JobRole from '@/lib/models/JobRole';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const roles = await JobRole.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, roles });
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
    const { title, category, description, responsibilities, requirements, workType, workMode, location, salaryText, isSalaryVisible, isActive } = body;

    if (!title || !category || !description) {
      return NextResponse.json({ error: 'Title, category and description are required.' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await connectToDatabase();

    const newRole = await JobRole.create({
      title,
      slug,
      category,
      description,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : responsibilities ? responsibilities.split('\n').filter(Boolean) : [],
      requirements: Array.isArray(requirements) ? requirements : requirements ? requirements.split('\n').filter(Boolean) : [],
      workType: Array.isArray(workType) ? workType : ['Part-Time', 'Full-Time'],
      workMode: workMode || 'Work From Home',
      location: location || 'Remote (India)',
      salaryText: salaryText || '',
      isSalaryVisible: !!isSalaryVisible,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({ success: true, role: newRole }, { status: 201 });
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

    if (!_id) {
      return NextResponse.json({ error: 'Role ID is required for update.' }, { status: 400 });
    }

    await connectToDatabase();
    const updatedRole = await JobRole.findByIdAndUpdate(_id, updateData, { new: true });

    return NextResponse.json({ success: true, role: updatedRole });
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

    if (!id) {
      return NextResponse.json({ error: 'Role ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    await JobRole.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Role deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
