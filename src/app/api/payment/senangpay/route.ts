import { prisma } from '@/lib/prisma';
import { createSenangPayUrl, SenangPayConfig, SenangPayPaymentData } from '@/lib/senangpay';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { ecardId } = await request.json();

    // TODO: Implement proper authentication
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get E-Card
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

    // Check if already paid
    if (ecard.isPaid) {
      return NextResponse.json({ error: 'E-Card already unlocked' }, { status: 400 });
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        ecardId: ecardId,
        amount: 10.00,
        status: 'pending',
        currency: 'MYR',
        externalId: `ECARD-${ecardId}-${Date.now()}`,
      },
    });

    // Get user info for payment
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Configure senangPay
    const config: SenangPayConfig = {
      merchantId: process.env.SENANGPAY_MERCHANT_ID!,
      secretKey: process.env.SENANGPAY_SECRET_KEY!,
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/payment/callback?paymentId=${payment.id}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/payment/callback?paymentId=${payment.id}`,
    };

    // Prepare payment data
    const paymentData: SenangPayPaymentData = {
      detail: `Unlock Wedding E-Card: ${ecard.groomName} & ${ecard.brideName}`,
      amount: 10.00,
      order_id: payment.externalId!,
      name: user?.name || 'Guest',
      email: user?.email || '',
      phone: '', // Optional, can be added to user model later
    };

    // Generate payment URL
    const paymentUrl = createSenangPayUrl(config, paymentData);

    // Update payment with order ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { externalId: paymentData.order_id },
    });

    return NextResponse.json({ url: paymentUrl, paymentId: payment.id });
  } catch (error) {
    console.error('senangPay payment creation error:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
