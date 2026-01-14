import { prisma } from '@/lib/prisma';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import { notFound } from 'next/navigation';
import { ECardData, Wish } from '@/components/templates/types';

export default async function PublicCardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  try {
    // Fetch E-Card data
    const ecard = await prisma.eCard.findUnique({
      where: { slug },
    });

    if (!ecard) {
      notFound();
    }

    // Fetch wishes
    const wishes = await prisma.wish.findMany({
      where: { ecardId: ecard.id },
      orderBy: { createdAt: 'desc' },
    });

    // Transform to match ECardData type
    const typedEcard: ECardData = {
      id: ecard.id,
      bride_name: ecard.brideName,
      groom_name: ecard.groomName,
      parents_names: ecard.parentsNames as any,
      wedding_date: ecard.weddingDate.toISOString(),
      wedding_venue: ecard.weddingVenue,
      music_url: ecard.musicUrl || undefined,
      template_type: ecard.templateType as 'cute' | 'elegant' | 'formal',
      is_paid: ecard.isPaid,
      config: ecard.config as any,
      itinerary: ecard.itinerary as any,
      contact_info: ecard.contactInfo as any,
      google_maps_url: ecard.googleMapsUrl || undefined,
      waze_url: ecard.wazeUrl || undefined,
      gift_bank_name: ecard.giftBankName || undefined,
      gift_account_no: ecard.giftAccountNo || undefined,
      gift_qr_url: ecard.giftQrUrl || undefined,
      countdown_date: ecard.countdownDate?.toISOString(),
      rsvp_deadline: ecard.rsvpDeadline?.toISOString(),
      photo_gallery: ecard.photoGallery as any,
    };

    const typedWishes: Wish[] = wishes.map(w => ({
      id: w.id,
      guest_name: w.guestName,
      message: w.message,
      created_at: w.createdAt.toISOString(),
    }));

    return (
      <main>
        <TemplateRenderer 
          data={typedEcard} 
          wishes={typedWishes} 
          isPreview={!typedEcard.is_paid} 
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching card:', error);
    notFound();
  }
}
