export interface ECardData {
  id?: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  wedding_venue: string;
  music_url?: string;
  template_type: 'cute' | 'elegant' | 'formal';
  is_paid: boolean;
  config?: {
    primary_color?: string;
    secondary_color?: string;
    font_family?: string;
    message?: string;
    gallery_urls?: string[];
  };
}

export interface Wish {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}
