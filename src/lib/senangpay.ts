import crypto from 'crypto';

/**
 * senangPay Payment Integration
 * Documentation: https://senangpay.my/api/
 */

export interface SenangPayConfig {
  merchantId: string;
  secretKey: string;
  returnUrl: string;
  callbackUrl: string;
}

export interface SenangPayPaymentData {
  detail: string; // Description
  amount: number; // Amount in MYR
  order_id: string; // Unique order ID
  name: string; // Customer name
  email: string; // Customer email
  phone: string; // Customer phone
}

/**
 * Generate HMAC-SHA256 hash for senangPay
 */
export function generateSenangPayHash(
  secretKey: string,
  detail: string,
  amount: number,
  orderId: string
): string {
  const hashString = `${secretKey}${detail}${amount}${orderId}`;
  return crypto.createHmac('sha256', secretKey).update(hashString).digest('hex');
}

/**
 * Verify senangPay callback hash
 */
export function verifySenangPayHash(
  secretKey: string,
  statusId: string,
  orderId: string,
  transactionId: string,
  msg: string,
  hash: string
): boolean {
  const hashString = `${secretKey}${statusId}${orderId}${transactionId}${msg}`;
  const calculatedHash = crypto.createHmac('sha256', secretKey).update(hashString).digest('hex');
  return calculatedHash === hash;
}

/**
 * Create senangPay payment URL
 */
export function createSenangPayUrl(
  config: SenangPayConfig,
  paymentData: SenangPayPaymentData
): string {
  const { merchantId, secretKey, returnUrl, callbackUrl } = config;
  const { detail, amount, order_id, name, email, phone } = paymentData;

  // Generate hash
  const hash = generateSenangPayHash(secretKey, detail, amount, order_id);

  // Build payment URL
  const params = new URLSearchParams({
    merchant_id: merchantId,
    detail,
    amount: amount.toString(),
    order_id,
    name,
    email,
    phone,
    hash,
    return_url: returnUrl,
    callback_url: callbackUrl,
  });

  return `https://app.senangpay.my/payment/${merchantId}?${params.toString()}`;
}

/**
 * Payment methods supported by senangPay:
 * - FPX (Online Banking)
 * - TNG E-Wallet
 * - GrabPay
 * - Boost
 * - ShopeePay
 * - Credit/Debit Card
 */
