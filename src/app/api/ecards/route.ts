import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ECardData } from '@/components/templates/types';

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
      wedding_date,
      wedding_venue,
      music_url,
      template_type,
      config,
    } = body;

    // Generate unique slug
    const baseSlug = `${groom_name.toLowerCase()}-${bride_name.toLowerCase()}-${Date.now()}`.replace(/[^a-z0-9-]/g, '-');
    
    // Create E-Card
    const ecard = await prisma.eCard.create({
      data: {
        ownerId: userId,
        brideName: bride_name,
        groomName: groom_name,
        weddingDate: new Date(wedding_date),
        weddingVenue: wedding_venue,
        musicUrl: music_url || null,
        templateType: template_type || 'elegant',
        slug: baseSlug,
        config: config || {},
        isPaid: false,
      },
    });

    return NextResponse.json({
      id: ecard.id,
      bride_name: ecard.brideName,
      groom_name: ecard.groomName,
      wedding_date: ecard.weddingDate.toISOString(),
      wedding_venue: ecard.weddingVenue,
      music_url: ecard.musicUrl,
      template_type: ecard.templateType,
      is_paid: ecard.isPaid,
      slug: ecard.slug,
      config: ecard.config,
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
        ...(updateData.wedding_date && { weddingDate: new Date(updateData.wedding_date) }),
        ...(updateData.wedding_venue && { weddingVenue: updateData.wedding_venue }),
        ...(updateData.music_url !== undefined && { musicUrl: updateData.music_url || null }),
        ...(updateData.template_type && { templateType: updateData.template_type }),
        ...(updateData.config && { config: updateData.config }),
      },
    });

    return NextResponse.json({
      id: ecard.id,
      bride_name: ecard.brideName,
      groom_name: ecard.groomName,
      wedding_date: ecard.weddingDate.toISOString(),
      wedding_venue: ecard.weddingVenue,
      music_url: ecard.musicUrl,
      template_type: ecard.templateType,
      is_paid: ecard.isPaid,
      slug: ecard.slug,
      config: ecard.config,
    });
  } catch (error) {
    console.error('E-Card update error:', error);
    return NextResponse.json({ error: 'Failed to update E-Card' }, { status: 500 });
  }
}
