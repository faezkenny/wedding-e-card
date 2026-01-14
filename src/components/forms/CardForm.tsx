'use client';

import { useState } from 'react';
import { ECardData, ParentsNames, ItineraryItem, ContactInfo } from '../templates/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Sparkles, Gavel, Save, ExternalLink, Users, Calendar, MapPin, Music2, Image as ImageIcon, Gift, Phone, Plus, X, BookOpen } from 'lucide-react';

interface CardFormProps {
  initialData?: Partial<ECardData>;
  onUpdate: (data: ECardData) => void;
  onSave: (data: ECardData) => Promise<void>;
}

export default function CardForm({ initialData, onUpdate, onSave }: CardFormProps) {
  const [formData, setFormData] = useState<ECardData>({
    bride_name: initialData?.bride_name || '',
    groom_name: initialData?.groom_name || '',
    parents_names: initialData?.parents_names || {},
    wedding_date: initialData?.wedding_date || new Date().toISOString(),
    wedding_venue: initialData?.wedding_venue || '',
    music_url: initialData?.music_url || '',
    template_type: initialData?.template_type || 'elegant',
    is_paid: initialData?.is_paid || false,
    itinerary: initialData?.itinerary || [],
    contact_info: initialData?.contact_info || [],
    google_maps_url: initialData?.google_maps_url || '',
    waze_url: initialData?.waze_url || '',
    gift_bank_name: initialData?.gift_bank_name || '',
    gift_account_no: initialData?.gift_account_no || '',
    gift_qr_url: initialData?.gift_qr_url || '',
    countdown_date: initialData?.countdown_date || '',
    rsvp_deadline: initialData?.rsvp_deadline || '',
    photo_gallery: initialData?.photo_gallery || [],
    wali_name: initialData?.wali_name || '',
    mas_kahwin: initialData?.mas_kahwin || '',
    akad_nikah_date: initialData?.akad_nikah_date || '',
    akad_nikah_venue: initialData?.akad_nikah_venue || '',
    doa_message: initialData?.doa_message || '',
    config: initialData?.config || {},
  });

  const updateField = (field: keyof ECardData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const addItineraryItem = () => {
    const newItem: ItineraryItem = { title: '', time: '', description: '' };
    updateField('itinerary', [...(formData.itinerary || []), newItem]);
  };

  const updateItineraryItem = (index: number, field: keyof ItineraryItem, value: string) => {
    const updated = [...(formData.itinerary || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateField('itinerary', updated);
  };

  const removeItineraryItem = (index: number) => {
    const updated = [...(formData.itinerary || [])];
    updated.splice(index, 1);
    updateField('itinerary', updated);
  };

  const addContactInfo = () => {
    const newContact: ContactInfo = { name: '', phone: '', whatsapp: '' };
    updateField('contact_info', [...(formData.contact_info || []), newContact]);
  };

  const updateContactInfo = (index: number, field: keyof ContactInfo, value: string) => {
    const updated = [...(formData.contact_info || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateField('contact_info', updated);
  };

  const removeContactInfo = (index: number) => {
    const updated = [...(formData.contact_info || [])];
    updated.splice(index, 1);
    updateField('contact_info', updated);
  };

  const addPhotoUrl = () => {
    updateField('photo_gallery', [...(formData.photo_gallery || []), '']);
  };

  const updatePhotoUrl = (index: number, value: string) => {
    const updated = [...(formData.photo_gallery || [])];
    updated[index] = value;
    updateField('photo_gallery', updated);
  };

  const removePhotoUrl = (index: number) => {
    const updated = [...(formData.photo_gallery || [])];
    updated.splice(index, 1);
    updateField('photo_gallery', updated);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-none lg:shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          Edit Kad Digital <Heart className="text-pink-500 fill-pink-500" size={20} />
        </CardTitle>
        <CardDescription>
          Lengkapkan semua maklumat perkahwinan anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="umum" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="umum">Umum</TabsTrigger>
            <TabsTrigger value="akad">Akad Nikah</TabsTrigger>
            <TabsTrigger value="majlis">Majlis</TabsTrigger>
            <TabsTrigger value="lokasi">Location</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="hadiah">RSVP & Gift</TabsTrigger>
          </TabsList>

          {/* Umum Tab */}
          <TabsContent value="umum" className="space-y-6">
            <div className="space-y-4">
              <Label>Pilih Design</Label>
              <Tabs defaultValue={formData.template_type} onValueChange={(v) => updateField('template_type', v)}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="elegant"><Gavel size={16} className="mr-2" /> Tradisional</TabsTrigger>
                  <TabsTrigger value="cute"><Sparkles size={16} className="mr-2" /> Moden Islamik</TabsTrigger>
                  <TabsTrigger value="formal"><Heart size={16} className="mr-2" /> Klasik Melayu</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groom_name">Nama Pengantin Lelaki</Label>
                <Input id="groom_name" value={formData.groom_name} onChange={(e) => updateField('groom_name', e.target.value)} placeholder="Ahmad bin Abdullah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bride_name">Nama Pengantin Perempuan</Label>
                <Input id="bride_name" value={formData.bride_name} onChange={(e) => updateField('bride_name', e.target.value)} placeholder="Siti binti Hassan" />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Nama Ibu Bapa (Pilihan)</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bride_father" className="text-sm">Bapa Pengantin Perempuan</Label>
                  <Input id="bride_father" value={formData.parents_names?.brideFather || ''} onChange={(e) => updateField('parents_names', { ...formData.parents_names, brideFather: e.target.value })} placeholder="Hassan bin Ali" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bride_mother" className="text-sm">Ibu Pengantin Perempuan</Label>
                  <Input id="bride_mother" value={formData.parents_names?.brideMother || ''} onChange={(e) => updateField('parents_names', { ...formData.parents_names, brideMother: e.target.value })} placeholder="Aminah binti Ahmad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groom_father" className="text-sm">Bapa Pengantin Lelaki</Label>
                  <Input id="groom_father" value={formData.parents_names?.groomFather || ''} onChange={(e) => updateField('parents_names', { ...formData.parents_names, groomFather: e.target.value })} placeholder="Abdullah bin Ismail" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groom_mother" className="text-sm">Ibu Pengantin Lelaki</Label>
                  <Input id="groom_mother" value={formData.parents_names?.groomMother || ''} onChange={(e) => updateField('parents_names', { ...formData.parents_names, groomMother: e.target.value })} placeholder="Fatimah binti Omar" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Akad Nikah Tab */}
          <TabsContent value="akad" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="akad_nikah_date">Tarikh & Masa Akad Nikah</Label>
              <Input id="akad_nikah_date" type="datetime-local" value={formData.akad_nikah_date ? new Date(formData.akad_nikah_date).toISOString().slice(0, 16) : ''} onChange={(e) => updateField('akad_nikah_date', e.target.value ? new Date(e.target.value).toISOString() : '')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="akad_nikah_venue">Tempat Akad Nikah</Label>
              <Textarea id="akad_nikah_venue" value={formData.akad_nikah_venue || ''} onChange={(e) => updateField('akad_nikah_venue', e.target.value)} rows={3} placeholder="Masjid atau rumah..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wali_name">Nama Wali</Label>
              <Input id="wali_name" value={formData.wali_name || ''} onChange={(e) => updateField('wali_name', e.target.value)} placeholder="Hassan bin Ali" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mas_kahwin">Mas Kahwin</Label>
              <Input id="mas_kahwin" value={formData.mas_kahwin || ''} onChange={(e) => updateField('mas_kahwin', e.target.value)} placeholder="RM 500.00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doa_message">Mesej Khas (Pilihan)</Label>
              <Textarea id="doa_message" value={formData.doa_message || ''} onChange={(e) => updateField('doa_message', e.target.value)} rows={4} placeholder="Masukkan mesej khas atau doa..." />
            </div>
          </TabsContent>

          {/* Majlis Tab */}
          <TabsContent value="majlis" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="wedding_date">Tarikh & Masa</Label>
              <Input id="wedding_date" type="datetime-local" value={formData.wedding_date.slice(0, 16)} onChange={(e) => updateField('wedding_date', new Date(e.target.value).toISOString())} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wedding_venue">Tempat</Label>
              <Textarea id="wedding_venue" value={formData.wedding_venue} onChange={(e) => updateField('wedding_venue', e.target.value)} rows={3} placeholder="Dewan atau hotel..." />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Aturcara Majlis</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItineraryItem}>
                  <Plus className="h-4 w-4 mr-1" /> Tambah Acara
                </Button>
              </div>
              {(formData.itinerary || []).map((item, index) => (
                <div key={index} className="flex gap-2 p-3 border rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <Input placeholder="Tajuk Acara" value={item.title} onChange={(e) => updateItineraryItem(index, 'title', e.target.value)} />
                    <Input placeholder="Masa (cth: 2:00 PM)" value={item.time} onChange={(e) => updateItineraryItem(index, 'time', e.target.value)} />
                    <Input placeholder="Penerangan" value={item.description || ''} onChange={(e) => updateItineraryItem(index, 'description', e.target.value)} />
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeItineraryItem(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Lokasi Tab */}
          <TabsContent value="lokasi" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="google_maps_url">Google Maps URL</Label>
              <Input id="google_maps_url" value={formData.google_maps_url || ''} onChange={(e) => updateField('google_maps_url', e.target.value)} placeholder="https://maps.google.com/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waze_url">Waze URL</Label>
              <Input id="waze_url" value={formData.waze_url || ''} onChange={(e) => updateField('waze_url', e.target.value)} placeholder="https://waze.com/ul/..." />
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="music_url">Background Music URL</Label>
              <Input id="music_url" value={formData.music_url || ''} onChange={(e) => updateField('music_url', e.target.value)} placeholder="https://example.com/lagu.mp3" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Galeri</Label>
                <Button type="button" variant="outline" size="sm" onClick={addPhotoUrl}>
                  <Plus className="h-4 w-4 mr-1" /> Tambah Foto
                </Button>
              </div>
              {(formData.photo_gallery || []).map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input placeholder="URL Foto" value={url} onChange={(e) => updatePhotoUrl(index, e.target.value)} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removePhotoUrl(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* RSVP & Hadiah Tab */}
          <TabsContent value="hadiah" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="countdown_date">Countdown Date</Label>
              <Input id="countdown_date" type="datetime-local" value={formData.countdown_date ? new Date(formData.countdown_date).toISOString().slice(0, 16) : ''} onChange={(e) => updateField('countdown_date', e.target.value ? new Date(e.target.value).toISOString() : '')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsvp_deadline">RSVP Deadline</Label>
              <Input id="rsvp_deadline" type="datetime-local" value={formData.rsvp_deadline ? new Date(formData.rsvp_deadline).toISOString().slice(0, 16) : ''} onChange={(e) => updateField('rsvp_deadline', e.target.value ? new Date(e.target.value).toISOString() : '')} />
            </div>

            <div className="space-y-4">
              <Label>Contact</Label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Untuk butang WhatsApp</span>
                <Button type="button" variant="outline" size="sm" onClick={addContactInfo}>
                  <Plus className="h-4 w-4 mr-1" /> Tambah Hubungan
                </Button>
              </div>
              {(formData.contact_info || []).map((contact, index) => (
                <div key={index} className="flex gap-2 p-3 border rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <Input placeholder="Nama" value={contact.name} onChange={(e) => updateContactInfo(index, 'name', e.target.value)} />
                    <Input placeholder="Telefon" value={contact.phone || ''} onChange={(e) => updateContactInfo(index, 'phone', e.target.value)} />
                    <Input placeholder="WhatsApp" value={contact.whatsapp || ''} onChange={(e) => updateContactInfo(index, 'whatsapp', e.target.value)} />
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeContactInfo(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-4">
              <Label>Money Gift</Label>
              <div className="space-y-2">
                <Label htmlFor="gift_bank_name" className="text-sm">Nama Bank</Label>
                <Input id="gift_bank_name" value={formData.gift_bank_name || ''} onChange={(e) => updateField('gift_bank_name', e.target.value)} placeholder="Maybank" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gift_account_no" className="text-sm">Nombor Akaun</Label>
                <Input id="gift_account_no" value={formData.gift_account_no || ''} onChange={(e) => updateField('gift_account_no', e.target.value)} placeholder="1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gift_qr_url" className="text-sm">URL Imej Kod QR</Label>
                <Input id="gift_qr_url" value={formData.gift_qr_url || ''} onChange={(e) => updateField('gift_qr_url', e.target.value)} placeholder="https://example.com/kod-qr.jpg" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-6 border-t mt-6 flex flex-col gap-3">
            <Button onClick={() => onSave(formData)} className="w-full bg-pink-600 hover:bg-pink-700">
            <Save className="mr-2" size={18} /> Simpan
          </Button>
          {!formData.is_paid && (
            <Button 
              variant="outline" 
              className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
              onClick={async () => {
                if (!formData.id) {
                  alert('Sila simpan kad anda terlebih dahulu sebelum membuka.');
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
                  alert('Gagal memulakan pembayaran. Sila cuba lagi.');
                }
              }}
            >
              <ExternalLink className="mr-2" size={18} /> Buka Kad Awam (RM10)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
