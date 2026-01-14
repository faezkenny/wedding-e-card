import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });
    }

    // 1. Update payment status
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'completed' },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // 2. Unlock E-Card
    await prisma.eCard.update({
      where: { id: payment.ecardId },
      data: { isPaid: true },
    });

    // 3. Redirect back to dashboard
    redirect('/dashboard?success=true');
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
