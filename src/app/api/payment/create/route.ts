import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { ecardId } = await request.json();

    // TODO: Implement proper authentication
    // For now, we'll skip auth check but you should add session/auth validation
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Get E-Card
    const ecard = await prisma.eCard.findUnique({
      where: { id: ecardId },
    });

    if (!ecard) {
      return NextResponse.json({ error: 'E-Card not found' }, { status: 404 });
    }

    // Verify ownership
    if (ecard.ownerId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 2. Create payment record
    const payment = await prisma.payment.create({
      data: {
        ecardId: ecardId,
        amount: 10.00,
        status: 'pending',
        currency: 'MYR',
      },
    });

    // Use senangPay for production, mock for development
    if (process.env.NODE_ENV === 'production' && process.env.SENANGPAY_MERCHANT_ID) {
      // Redirect to senangPay payment creation
      const senangPayResponse = await fetch(`${request.url.replace('/create', '/senangpay')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ecardId }),
      });
      
      if (senangPayResponse.ok) {
        const data = await senangPayResponse.json();
        return NextResponse.json(data);
      }
    }

    // Fallback to mock payment for development
    const mockPaymentUrl = `/api/payment/mock-process?paymentId=${payment.id}`;
    return NextResponse.json({ 
      url: mockPaymentUrl,
      paymentId: payment.id 
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
