import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, MapPin, Music, MessageSquare, Clock, Image, Users, Gift, Phone, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'RSVP Management',
      description: 'Track guest attendance with intelligent RSVP system',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Countdown Timer',
      description: 'Build excitement with a real-time countdown to your special day',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Maps Integration',
      description: 'Easy directions with Google Maps and Waze links',
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Background Music',
      description: 'Add your favorite song to enhance the invitation experience',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Guestbook',
      description: 'Let guests leave heartfelt wishes and messages',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Event Itinerary',
      description: 'Share detailed schedule to help guests plan their visit',
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: 'Photo Gallery',
      description: 'Showcase memorable photos and previews',
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Monetary Gifts',
      description: 'Share bank details and QR codes for easy gifting',
    },
  ];

  const templates = [
    {
      name: 'Elegant',
      description: 'Minimalist design with sophisticated typography',
      color: 'bg-gradient-to-br from-amber-50 to-amber-100',
      preview: '/templates/elegant-preview.jpg',
    },
    {
      name: 'Cute',
      description: 'Playful colors with floating hearts and animations',
      color: 'bg-gradient-to-br from-pink-50 to-pink-100',
      preview: '/templates/cute-preview.jpg',
    },
    {
      name: 'Formal',
      description: 'Classic structure with bold gold accents',
      color: 'bg-gradient-to-br from-slate-50 to-slate-100',
      preview: '/templates/formal-preview.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-amber-50 py-20 px-4 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-100">
              <Heart className="mr-1 h-3 w-3 fill-pink-700" />
              Digital Wedding Invitations
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Create Beautiful
              <span className="bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent"> Wedding E-Cards</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Share your special day with elegant, customizable digital invitations. 
              Include RSVP, maps, music, and more—all in one beautiful card.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-700 hover:to-amber-700">
                <Link href="/dashboard">
                  Create Your E-Card Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">
                  Explore Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600">
              All the features you need to create a memorable digital invitation
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-pink-200"
              >
                <div className="mb-4 text-pink-600 group-hover:text-pink-700">
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
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Choose Your Style
            </h2>
            <p className="text-lg text-gray-600">
              Three beautiful templates to match your wedding theme
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl"
              >
                <div className={`h-48 ${template.color} flex items-center justify-center`}>
                  <Heart className="h-16 w-16 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {template.description}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard?template=${template.name.toLowerCase()}`}>
                      Preview Template
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-amber-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Simple, Affordable Pricing
            </h2>
            <p className="text-lg text-gray-600">
              One-time payment. Lifetime access to your E-Card.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-pink-200 bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2">
                <Badge className="bg-pink-600">Most Popular</Badge>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">RM 10</span>
                <span className="text-gray-600"> one-time</span>
              </div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                Full Access Package
              </h3>
              <ul className="mb-8 space-y-3 text-left">
                {[
                  'Unlimited edits to your E-Card',
                  'Public shareable link',
                  'RSVP management system',
                  'Guestbook for wishes',
                  'Countdown timer',
                  'Maps integration (Google Maps & Waze)',
                  'Background music',
                  'Event itinerary',
                  'Photo gallery',
                  'Monetary gift section',
                  'WhatsApp contact buttons',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-pink-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-full bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-700 hover:to-amber-700">
                <Link href="/dashboard">
                  Get Started Now
                </Link>
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                No hidden fees. No subscription. Pay once, use forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to Create Your E-Card?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Start customizing your beautiful wedding invitation in minutes
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-700 hover:to-amber-700">
            <Link href="/dashboard">
              Create Your E-Card Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
