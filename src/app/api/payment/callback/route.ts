import { prisma } from '@/lib/prisma';
import { verifySenangPayHash } from '@/lib/senangpay';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

/**
 * senangPay Callback Handler
 * Handles both return URL (user redirect) and callback URL (server-to-server)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    // senangPay callback parameters
    const statusId = searchParams.get('status_id');
    const orderId = searchParams.get('order_id');
    const transactionId = searchParams.get('transaction_id');
    const msg = searchParams.get('msg') || '';
    const hash = searchParams.get('hash');

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });
    }

    // Get payment record
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { ecard: true },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Verify hash if callback parameters are present
    if (hash && orderId && transactionId && statusId) {
      const secretKey = process.env.SENANGPAY_SECRET_KEY!;
      const isValid = verifySenangPayHash(
        secretKey,
        statusId,
        orderId,
        transactionId,
        msg,
        hash
      );

      if (!isValid) {
        console.error('Invalid senangPay hash');
        return NextResponse.json({ error: 'Invalid payment verification' }, { status: 400 });
      }
    }

    // Status ID meanings:
    // 1 = Success
    // 2 = Failed
    // 3 = Pending
    const isSuccess = statusId === '1';

    if (isSuccess) {
      // Update payment status
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'completed',
          senangPayId: transactionId || undefined,
        },
      });

      // Unlock E-Card
      await prisma.eCard.update({
        where: { id: payment.ecardId },
        data: { isPaid: true },
      });

      // Redirect to dashboard with success
      redirect(`/dashboard?success=true&slug=${payment.ecard.slug}`);
    } else {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' },
      });

      redirect(`/dashboard?error=payment_failed`);
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json({ error: 'Failed to process payment callback' }, { status: 500 });
  }
}
