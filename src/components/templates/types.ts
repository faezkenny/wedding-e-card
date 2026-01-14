export interface ParentsNames {
  brideFather?: string;
  brideMother?: string;
  groomFather?: string;
  groomMother?: string;
}

export interface ItineraryItem {
  title: string;
  time: string;
  description?: string;
}

export interface ContactInfo {
  name: string;
  phone?: string;
  whatsapp?: string;
}

export interface ECardData {
  id?: string;
  bride_name: string;
  groom_name: string;
  parents_names?: ParentsNames;
  wedding_date: string;
  wedding_venue: string;
  music_url?: string;
  template_type: 'cute' | 'elegant' | 'formal';
  is_paid: boolean;
  itinerary?: ItineraryItem[];
  contact_info?: ContactInfo[];
  google_maps_url?: string;
  waze_url?: string;
  gift_bank_name?: string;
  gift_account_no?: string;
  gift_qr_url?: string;
  countdown_date?: string;
  rsvp_deadline?: string;
  photo_gallery?: string[];
  // Islamic fields
  wali_name?: string; // Wali name
  mas_kahwin?: string; // Dowry amount
  akad_nikah_date?: string; // Akad Nikah date/time
  akad_nikah_venue?: string; // Akad Nikah venue
  doa_message?: string; // Custom doa/prayer message
  config?: {
    primary_color?: string;
    secondary_color?: string;
    font_family?: string;
    message?: string;
  };
}

export interface Wish {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

export interface RSVP {
  id: string;
  guest_name: string;
  phone_number?: string;
  number_of_pax: number;
  status: 'going' | 'not_going' | 'maybe';
  message?: string;
  created_at: string;
}
