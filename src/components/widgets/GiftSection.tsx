'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface GiftSectionProps {
  bankName?: string;
  accountNo?: string;
  qrUrl?: string;
  className?: string;
}

export default function GiftSection({ bankName, accountNo, qrUrl, className = '' }: GiftSectionProps) {
  if (!bankName && !accountNo && !qrUrl) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-2xl font-semibold text-center mb-6">Monetary Gifts</h3>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border space-y-4">
        {qrUrl && (
          <div className="flex justify-center">
            <Image
              src={qrUrl}
              alt="QR Code"
              width={200}
              height={200}
              className="rounded-lg border"
            />
          </div>
        )}
        {bankName && (
          <div className="text-center">
            <p className="text-sm opacity-70 mb-1">Bank Name</p>
            <p className="font-semibold text-lg">{bankName}</p>
          </div>
        )}
        {accountNo && (
          <div className="text-center">
            <p className="text-sm opacity-70 mb-1">Account Number</p>
            <p className="font-mono font-semibold text-lg">{accountNo}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                navigator.clipboard.writeText(accountNo);
                alert('Account number copied to clipboard!');
              }}
            >
              Copy Account Number
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
