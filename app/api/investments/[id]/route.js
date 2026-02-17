import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Investment from '@/models/Investment';

// GET single investment
export async function GET(request, { params }) {
  try {
    await connectDB();
    const investment = await Investment.findById(params.id);
    
    if (!investment) {
      return NextResponse.json(
        { success: false, error: 'Investment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: investment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update investment
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate numbers if provided
    if (body.quantity !== undefined && body.quantity <= 0) {
      return NextResponse.json(
        { success: false, error: 'Quantity must be a positive number' },
        { status: 400 }
      );
    }

    if (body.purchasePrice !== undefined && body.purchasePrice <= 0) {
      return NextResponse.json(
        { success: false, error: 'Purchase price must be a positive number' },
        { status: 400 }
      );
    }

    if (body.currentPrice !== undefined && body.currentPrice <= 0) {
      return NextResponse.json(
        { success: false, error: 'Current price must be a positive number' },
        { status: 400 }
      );
    }

    // Validate date if provided
    if (body.purchaseDate) {
      const date = new Date(body.purchaseDate);
      if (date > new Date()) {
        return NextResponse.json(
          { success: false, error: 'Purchase date cannot be in the future' },
          { status: 400 }
        );
      }
    }

    const investment = await Investment.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!investment) {
      return NextResponse.json(
        { success: false, error: 'Investment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: investment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE investment
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const investment = await Investment.findByIdAndDelete(params.id);

    if (!investment) {
      return NextResponse.json(
        { success: false, error: 'Investment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
