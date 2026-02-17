import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Investment from '@/models/Investment';

// GET all investments
export async function GET() {
  try {
    await connectDB();
    const investments = await Investment.find({ userId: 'default' }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: investments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new investment
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const { stockSymbol, type, purchaseDate, quantity, purchasePrice, currentPrice } = body;
    
    if (!stockSymbol || !type || !purchaseDate || !quantity || !purchasePrice || !currentPrice) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate numbers
    if (quantity <= 0 || purchasePrice <= 0 || currentPrice <= 0) {
      return NextResponse.json(
        { success: false, error: 'Quantity and prices must be positive numbers' },
        { status: 400 }
      );
    }

    // Validate date
    const date = new Date(purchaseDate);
    if (date > new Date()) {
      return NextResponse.json(
        { success: false, error: 'Purchase date cannot be in the future' },
        { status: 400 }
      );
    }

    const investment = await Investment.create({
      ...body,
      userId: 'default'
    });

    return NextResponse.json({ success: true, data: investment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
