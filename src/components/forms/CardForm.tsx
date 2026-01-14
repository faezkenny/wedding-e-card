'use client';

import { useState } from 'react';
import { ECardData } from '../templates/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Sparkles, Gavel, Save, ExternalLink } from 'lucide-react';

interface CardFormProps {
  initialData?: Partial<ECardData>;
  onUpdate: (data: ECardData) => void;
  onSave: (data: ECardData) => Promise<void>;
}

export default function CardForm({ initialData, onUpdate, onSave }: CardFormProps) {
  const [formData, setFormData] = useState<ECardData>({
    bride_name: initialData?.bride_name || 'Bride Name',
    groom_name: initialData?.groom_name || 'Groom Name',
    wedding_date: initialData?.wedding_date || new Date().toISOString(),
    wedding_venue: initialData?.wedding_venue || 'Wedding Venue Address',
    music_url: initialData?.music_url || '',
    template_type: initialData?.template_type || 'elegant',
    is_paid: initialData?.is_paid || false,
    config: initialData?.config || {},
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleTemplateChange = (value: string) => {
    const newData = { ...formData, template_type: value as any };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <Card className="w-full max-w-xl mx-auto border-none shadow-none lg:shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          Customize Your E-Card <Heart className="text-pink-500 fill-pink-500" size={20} />
        </CardTitle>
        <CardDescription>
          Fill in your wedding details and choose a template.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Template Selection */}
        <div className="space-y-4">
          <Label>Choose Template</Label>
          <Tabs defaultValue={formData.template_type} onValueChange={handleTemplateChange}>
            <TabsList className="grid grid-cols-3 w-full h-auto p-1 bg-muted">
              <TabsTrigger value="elegant" className="py-3 flex flex-col gap-1">
                <Gavel size={16} />
                <span className="text-xs">Elegant</span>
              </TabsTrigger>
              <TabsTrigger value="cute" className="py-3 flex flex-col gap-1">
                <Sparkles size={16} />
                <span className="text-xs">Cute</span>
              </TabsTrigger>
              <TabsTrigger value="formal" className="py-3 flex flex-col gap-1">
                <Heart size={16} />
                <span className="text-xs">Formal</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Names */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="groom_name">Groom's Name</Label>
            <Input 
              id="groom_name" 
              name="groom_name" 
              value={formData.groom_name} 
              onChange={handleChange}
              placeholder="Ahmad"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bride_name">Bride's Name</Label>
            <Input 
              id="bride_name" 
              name="bride_name" 
              value={formData.bride_name} 
              onChange={handleChange}
              placeholder="Siti"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="space-y-2">
          <Label htmlFor="wedding_date">Wedding Date & Time</Label>
          <Input 
            id="wedding_date" 
            name="wedding_date" 
            type="datetime-local"
            value={formData.wedding_date.slice(0, 16)} 
            onChange={handleChange}
          />
        </div>

        {/* Venue */}
        <div className="space-y-2">
          <Label htmlFor="wedding_venue">Venue Address</Label>
          <Textarea 
            id="wedding_venue" 
            name="wedding_venue" 
            value={formData.wedding_venue} 
            onChange={handleChange}
            placeholder="Grand Ballroom, Hotel..."
            rows={3}
          />
        </div>

        {/* Music */}
        <div className="space-y-2">
          <Label htmlFor="music_url">Background Music URL (Direct MP3 link)</Label>
          <Input 
            id="music_url" 
            name="music_url" 
            value={formData.music_url} 
            onChange={handleChange}
            placeholder="https://example.com/song.mp3"
          />
        </div>

        <div className="pt-6 border-t flex flex-col gap-3">
          <Button onClick={() => onSave(formData)} className="w-full bg-pink-600 hover:bg-pink-700">
            <Save className="mr-2" size={18} /> Save Progress
          </Button>
          {!formData.is_paid && (
            <Button 
              variant="outline" 
              className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
              onClick={async () => {
                if (!formData.id) {
                  alert('Please save your card first before unlocking.');
                  return;
                }
                try {
                  const response = await fetch('/api/payment/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ecardId: formData.id }),
                  });
                  const data = await response.json();
                  if (data.url) {
                    window.location.href = data.url;
                  }
                } catch (error) {
                  console.error('Payment error:', error);
                  alert('Failed to initiate payment. Please try again.');
                }
              }}
            >
              <ExternalLink className="mr-2" size={18} /> Unlock Public Card (RM10)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
