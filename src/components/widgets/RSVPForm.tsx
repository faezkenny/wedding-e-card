'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';

interface RSVPFormProps {
  ecardId: string;
  rsvpDeadline?: string;
  onSuccess?: () => void;
}

export default function RSVPForm({ ecardId, rsvpDeadline, onSuccess }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    guestName: '',
    phoneNumber: '',
    numberOfPax: 1,
    status: 'going' as 'going' | 'not_going' | 'maybe',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ecardId,
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ guestName: '', phoneNumber: '', numberOfPax: 1, status: 'going', message: '' });
        setTimeout(() => {
          setIsSuccess(false);
          onSuccess?.();
        }, 3000);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit RSVP');
      }
    } catch (error) {
      console.error('RSVP error:', error);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDeadlinePassed = rsvpDeadline && new Date(rsvpDeadline) < new Date();

  if (isDeadlinePassed) {
    return (
      <div className="p-6 border-2 border-dashed rounded-lg text-center">
        <p className="text-gray-600">RSVP deadline has passed</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-semibold">RSVP submitted successfully!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="guestName">Your Name *</Label>
        <Input
          id="guestName"
          value={formData.guestName}
          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
          required
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="+60123456789"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfPax">Number of Pax</Label>
          <Input
            id="numberOfPax"
            type="number"
            min="1"
            value={formData.numberOfPax}
            onChange={(e) => setFormData({ ...formData, numberOfPax: parseInt(e.target.value) || 1 })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="going">Going</SelectItem>
              <SelectItem value="maybe">Maybe</SelectItem>
              <SelectItem value="not_going">Not Going</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          placeholder="Leave a message for the couple..."
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </Button>
    </form>
  );
}
