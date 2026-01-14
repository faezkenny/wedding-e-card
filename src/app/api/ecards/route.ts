import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      bride_name,
      groom_name,
      parents_names,
      wedding_date,
      wedding_venue,
      music_url,
      template_type,
      config,
      itinerary,
      contact_info,
      google_maps_url,
      waze_url,
      gift_bank_name,
      gift_account_no,
      gift_qr_url,
      countdown_date,
      rsvp_deadline,
      photo_gallery,
    } = body;

    // Generate unique slug
    const baseSlug = `${groom_name.toLowerCase()}-${bride_name.toLowerCase()}-${Date.now()}`.replace(/[^a-z0-9-]/g, '-');
    
    // Create E-Card
    const ecard = await prisma.eCard.create({
      data: {
        ownerId: userId,
        brideName: bride_name,
        groomName: groom_name,
        parentsNames: parents_names || null,
        weddingDate: new Date(wedding_date),
        weddingVenue: wedding_venue,
        musicUrl: music_url || null,
        templateType: template_type || 'elegant',
        slug: baseSlug,
        config: config || {},
        itinerary: itinerary || null,
        contactInfo: contact_info || null,
        googleMapsUrl: google_maps_url || null,
        wazeUrl: waze_url || null,
        giftBankName: gift_bank_name || null,
        giftAccountNo: gift_account_no || null,
        giftQrUrl: gift_qr_url || null,
        countdownDate: countdown_date ? new Date(countdown_date) : null,
        rsvpDeadline: rsvp_deadline ? new Date(rsvp_deadline) : null,
        photoGallery: photo_gallery || null,
        isPaid: false,
      },
    });

    return NextResponse.json({
      id: ecard.id,
      bride_name: ecard.brideName,
      groom_name: ecard.groomName,
      parents_names: ecard.parentsNames as any,
      wedding_date: ecard.weddingDate.toISOString(),
      wedding_venue: ecard.weddingVenue,
      music_url: ecard.musicUrl,
      template_type: ecard.templateType,
      is_paid: ecard.isPaid,
      slug: ecard.slug,
      config: ecard.config,
      itinerary: ecard.itinerary as any,
      contact_info: ecard.contactInfo as any,
      google_maps_url: ecard.googleMapsUrl,
      waze_url: ecard.wazeUrl,
      gift_bank_name: ecard.giftBankName,
      gift_account_no: ecard.giftAccountNo,
      gift_qr_url: ecard.giftQrUrl,
      countdown_date: ecard.countdownDate?.toISOString(),
      rsvp_deadline: ecard.rsvpDeadline?.toISOString(),
      photo_gallery: ecard.photoGallery as any,
    });
  } catch (error) {
    console.error('E-Card creation error:', error);
    return NextResponse.json({ error: 'Failed to create E-Card' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'E-Card ID required' }, { status: 400 });
    }

    // Verify ownership
    const existingEcard = await prisma.eCard.findUnique({
      where: { id },
    });

    if (!existingEcard || existingEcard.ownerId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update E-Card
    const ecard = await prisma.eCard.update({
      where: { id },
      data: {
        ...(updateData.bride_name && { brideName: updateData.bride_name }),
        ...(updateData.groom_name && { groomName: updateData.groom_name }),
        ...(updateData.parents_names !== undefined && { parentsNames: updateData.parents_names }),
        ...(updateData.wedding_date && { weddingDate: new Date(updateData.wedding_date) }),
        ...(updateData.wedding_venue && { weddingVenue: updateData.wedding_venue }),
        ...(updateData.music_url !== undefined && { musicUrl: updateData.music_url || null }),
        ...(updateData.template_type && { templateType: updateData.template_type }),
        ...(updateData.config && { config: updateData.config }),
        ...(updateData.itinerary !== undefined && { itinerary: updateData.itinerary }),
        ...(updateData.contact_info !== undefined && { contactInfo: updateData.contact_info }),
        ...(updateData.google_maps_url !== undefined && { googleMapsUrl: updateData.google_maps_url || null }),
        ...(updateData.waze_url !== undefined && { wazeUrl: updateData.waze_url || null }),
        ...(updateData.gift_bank_name !== undefined && { giftBankName: updateData.gift_bank_name || null }),
        ...(updateData.gift_account_no !== undefined && { giftAccountNo: updateData.gift_account_no || null }),
        ...(updateData.gift_qr_url !== undefined && { giftQrUrl: updateData.gift_qr_url || null }),
        ...(updateData.countdown_date && { countdownDate: new Date(updateData.countdown_date) }),
        ...(updateData.countdown_date === null && { countdownDate: null }),
        ...(updateData.rsvp_deadline && { rsvpDeadline: new Date(updateData.rsvp_deadline) }),
        ...(updateData.rsvp_deadline === null && { rsvpDeadline: null }),
        ...(updateData.photo_gallery !== undefined && { photoGallery: updateData.photo_gallery }),
      },
    });

    return NextResponse.json({
      id: ecard.id,
      bride_name: ecard.brideName,
      groom_name: ecard.groomName,
      parents_names: ecard.parentsNames as any,
      wedding_date: ecard.weddingDate.toISOString(),
      wedding_venue: ecard.weddingVenue,
      music_url: ecard.musicUrl,
      template_type: ecard.templateType,
      is_paid: ecard.isPaid,
      slug: ecard.slug,
      config: ecard.config,
      itinerary: ecard.itinerary as any,
      contact_info: ecard.contactInfo as any,
      google_maps_url: ecard.googleMapsUrl,
      waze_url: ecard.wazeUrl,
      gift_bank_name: ecard.giftBankName,
      gift_account_no: ecard.giftAccountNo,
      gift_qr_url: ecard.giftQrUrl,
      countdown_date: ecard.countdownDate?.toISOString(),
      rsvp_deadline: ecard.rsvpDeadline?.toISOString(),
      photo_gallery: ecard.photoGallery as any,
    });
  } catch (error) {
    console.error('E-Card update error:', error);
    return NextResponse.json({ error: 'Failed to update E-Card' }, { status: 500 });
  }
}
