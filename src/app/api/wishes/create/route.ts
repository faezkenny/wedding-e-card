import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { ecardId, guestName, message } = await request.json();

    if (!ecardId || !guestName || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Check if ecard exists
    const ecard = await prisma.eCard.findUnique({
      where: { id: ecardId },
      select: { isPaid: true },
    });

    if (!ecard) {
      return NextResponse.json({ error: 'E-Card not found' }, { status: 404 });
    }

    // 2. Insert wish (allow wishes even for unpaid cards, but they might be hidden in UI)
    const wish = await prisma.wish.create({
      data: {
        ecardId: ecardId,
        guestName: guestName,
        message: message,
      },
    });

    return NextResponse.json({
      id: wish.id,
      guest_name: wish.guestName,
      message: wish.message,
      created_at: wish.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Wish creation error:', error);
    return NextResponse.json({ error: 'Failed to submit wish' }, { status: 500 });
  }
}
