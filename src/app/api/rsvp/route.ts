import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { ecardId, guestName, phoneNumber, numberOfPax, status, message } = await request.json();

    if (!ecardId || !guestName || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if ecard exists
    const ecard = await prisma.eCard.findUnique({
      where: { id: ecardId },
      select: { isPaid: true, rsvpDeadline: true },
    });

    if (!ecard) {
      return NextResponse.json({ error: 'E-Card not found' }, { status: 404 });
    }

    // Check if RSVP deadline has passed
    if (ecard.rsvpDeadline && new Date(ecard.rsvpDeadline) < new Date()) {
      return NextResponse.json({ error: 'RSVP deadline has passed' }, { status: 400 });
    }

    // Create or update RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        ecardId: ecardId,
        guestName: guestName,
        phoneNumber: phoneNumber || null,
        numberOfPax: numberOfPax || 1,
        status: status,
        message: message || null,
      },
    });

    return NextResponse.json({
      id: rsvp.id,
      guest_name: rsvp.guestName,
      phone_number: rsvp.phoneNumber,
      number_of_pax: rsvp.numberOfPax,
      status: rsvp.status,
      message: rsvp.message,
      created_at: rsvp.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('RSVP creation error:', error);
    return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ecardId = searchParams.get('ecardId');

    if (!ecardId) {
      return NextResponse.json({ error: 'E-Card ID required' }, { status: 400 });
    }

    const rsvps = await prisma.rSVP.findMany({
      where: { ecardId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(rsvps.map(r => ({
      id: r.id,
      guest_name: r.guestName,
      phone_number: r.phoneNumber,
      number_of_pax: r.numberOfPax,
      status: r.status,
      message: r.message,
      created_at: r.createdAt.toISOString(),
    })));
  } catch (error) {
    console.error('RSVP fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 });
  }
}
