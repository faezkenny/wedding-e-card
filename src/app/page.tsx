import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, MapPin, Music, MessageSquare, Clock, Image, Users, Gift, Phone, CheckCircle2 } from 'lucide-react';
import { BatikFloral } from '@/components/patterns/BatikPatterns';
import { BismillahHeader } from '@/components/patterns/ArabicCalligraphy';
import { BungaRaya, CrescentStar } from '@/components/patterns/MalaysianSymbols';

export default function Home() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Sistem RSVP',
      description: 'Urus kehadiran tetamu dengan sistem RSVP yang pintar',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Kiraan Masa',
      description: 'Bangunkan keseronokan dengan kiraan masa masa nyata ke hari istimewa anda',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Integrasi Peta',
      description: 'Arahan mudah dengan pautan Google Maps dan Waze',
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Muzik Latar',
      description: 'Tambah lagu kegemaran anda untuk meningkatkan pengalaman jemputan',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Buku Ucapan',
      description: 'Biarkan tetamu meninggalkan doa dan ucapan ikhlas',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Jadual Acara',
      description: 'Kongsi jadual terperinci untuk membantu tetamu merancang lawatan mereka',
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: 'Galeri Foto',
      description: 'Pamerkan foto kenangan dan pratonton',
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Hadiah Wang',
      description: 'Kongsi butiran bank dan kod QR untuk hadiah yang mudah',
    },
  ];

  const templates = [
    {
      name: 'Tradisional',
      description: 'Reka bentuk tradisional dengan corak batik dan khat Arab',
      color: 'bg-gradient-to-br from-amber-50 via-green-50 to-amber-100',
      preview: '/templates/elegant-preview.jpg',
    },
    {
      name: 'Moden Islamik',
      description: 'Warna lembut dengan corak batik bunga dan motif Islamik',
      color: 'bg-gradient-to-br from-pink-50 to-pink-100',
      preview: '/templates/cute-preview.jpg',
    },
    {
      name: 'Klasik Melayu',
      description: 'Struktur klasik dengan corak songket dan aksen emas berani',
      color: 'bg-gradient-to-br from-red-50 via-amber-50 to-red-100',
      preview: '/templates/formal-preview.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#FFF8DC] relative overflow-hidden">
      {/* Background Batik Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <BatikFloral color="#D4AF37" opacity={0.1} className="w-full h-full" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F5DC] via-white to-[#FFF0F5] py-20 px-4 sm:py-32 z-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            {/* Bismillah */}
            <div className="mb-6">
              <BismillahHeader />
            </div>

            <Badge className="mb-4 bg-gradient-to-r from-[#006B3C] to-[#D4AF37] text-white hover:from-[#004d2a] hover:to-[#B8941F]">
              <Heart className="mr-1 h-3 w-3 fill-white" />
              Kad Jemputan Perkahwinan Digital
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Cipta Kad E-Perkahwinan
              <span className="bg-gradient-to-r from-[#006B3C] to-[#D4AF37] bg-clip-text text-transparent"> Yang Cantik</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 sm:text-xl">
              Kongsi hari istimewa anda dengan jemputan digital yang elegan dan boleh disesuaikan. 
              Termasuk RSVP, peta, muzik, dan banyak lagi—semua dalam satu kad yang cantik.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#006B3C] to-[#004d2a] hover:from-[#004d2a] hover:to-[#006B3C] text-white">
                <Link href="/dashboard">
                  Cipta Kad E-Card Anda Sekarang
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#006B3C] text-[#006B3C] hover:bg-[#006B3C] hover:text-white">
                <Link href="#features">
                  Terokai Ciri-ciri
                </Link>
              </Button>
            </div>
            
            {/* Decorative Elements */}
            <div className="flex justify-center gap-4 mt-8">
              <BungaRaya size={30} color="#D4AF37" />
              <CrescentStar size={30} color="#006B3C" />
              <BungaRaya size={30} color="#D4AF37" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Semua Yang Anda Perlukan
            </h2>
            <p className="text-lg text-gray-600">
              Semua ciri yang anda perlukan untuk mencipta jemputan digital yang tidak dapat dilupakan
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-[#006B3C]"
              >
                <div className="mb-4 text-[#006B3C] group-hover:text-[#D4AF37]">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 px-4 bg-white relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Pilih Gaya Anda
            </h2>
            <p className="text-lg text-gray-600">
              Tiga templat cantik untuk sepadan dengan tema perkahwinan anda
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border-2 border-[#D4AF37]/30 bg-white shadow-sm transition-all hover:shadow-xl hover:border-[#006B3C]"
              >
                <div className={`h-48 ${template.color} flex items-center justify-center relative`}>
                  {index === 0 && <BungaRaya size={60} color="#D4AF37" />}
                  {index === 1 && <Heart className="h-16 w-16 text-pink-400 fill-pink-400" />}
                  {index === 2 && <CrescentStar size={60} color="#FFD700" />}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {template.description}
                  </p>
                  <Button asChild variant="outline" className="w-full border-[#006B3C] text-[#006B3C] hover:bg-[#006B3C] hover:text-white">
                    <Link href={`/dashboard?template=${index === 0 ? 'elegant' : index === 1 ? 'cute' : 'formal'}`}>
                      Pratonton Templat
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5F5DC] to-[#FFF8DC] relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Harga Mudah & Berpatutan
            </h2>
            <p className="text-lg text-gray-600">
              Pembayaran sekali. Akses seumur hidup ke Kad E-Card anda.
            </p>
          </div>
          <div className="rounded-2xl border-4 border-[#D4AF37] bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#006B3C] to-[#D4AF37] px-4 py-2">
                <Badge className="bg-white text-[#006B3C]">Paling Popular</Badge>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">RM 10</span>
                <span className="text-gray-600"> sekali bayar</span>
              </div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                Pakej Akses Penuh
              </h3>
              <ul className="mb-8 space-y-3 text-left">
                {[
                  'Suntingan tanpa had pada Kad E-Card anda',
                  'Pautan boleh dikongsi secara awam',
                  'Sistem pengurusan RSVP',
                  'Buku ucapan untuk doa',
                  'Kiraan masa',
                  'Integrasi peta (Google Maps & Waze)',
                  'Muzik latar',
                  'Jadual acara',
                  'Galeri foto',
                  'Bahagian hadiah wang',
                  'Butang hubungan WhatsApp',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#006B3C]" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-full bg-gradient-to-r from-[#006B3C] to-[#004d2a] hover:from-[#004d2a] hover:to-[#006B3C] text-white">
                <Link href="/dashboard">
                  Mula Sekarang
                </Link>
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                Tiada yuran tersembunyi. Tiada langganan. Bayar sekali, gunakan selama-lamanya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Bersedia untuk Mencipta Kad E-Card Anda?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Mula menyesuaikan jemputan perkahwinan cantik anda dalam beberapa minit
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-[#006B3C] to-[#004d2a] hover:from-[#004d2a] hover:to-[#006B3C] text-white">
            <Link href="/dashboard">
              Cipta Kad E-Card Anda Sekarang
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
