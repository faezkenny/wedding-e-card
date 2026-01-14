# Wedding E-Card 💍

A beautiful, customizable wedding invitation platform where users can create elegant digital wedding cards, customize templates, and share them with guests. Guests can leave wishes and messages for the happy couple.

## Features

- 🎨 **Three Beautiful Templates**: Choose from Cute, Elegant, or Formal designs
- ✏️ **Customizable**: Edit bride/groom names, wedding date, venue, and music
- 💰 **RM10 Unlock**: One-time payment to unlock and share your E-Card publicly
- 💬 **Guest Wishes**: Guests can leave messages and wishes on your card
- 🎵 **Background Music**: Add your favorite song to play in the background
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 🔄 **Editable**: Continue editing your card even after sharing

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL (via Prisma)
- **Payment**: senangPay (FPX + E-Wallets: TNG, GrabPay, Boost, ShopeePay)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **ORM**: Prisma

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database (or any PostgreSQL database)
- senangPay account (for production payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/faezkenny/wedding-e-card.git
cd wedding-e-card
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@your-neon-db.neon.tech/neondb?sslmode=require"
SENANGPAY_MERCHANT_ID="your_merchant_id"
SENANGPAY_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Create Your Card**: Go to `/dashboard` and fill in your wedding details
2. **Choose Template**: Select from Cute, Elegant, or Formal templates
3. **Preview**: See live preview of your card as you customize
4. **Save**: Click "Save Progress" to save your card
5. **Unlock**: Pay RM10 to unlock and get a shareable public URL
6. **Share**: Share your card URL with guests
7. **Edit**: Continue editing your card anytime, even after sharing

## Project Structure

```
wedding-e-card/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── card/[slug]/      # Public card view
│   │   └── dashboard/        # Dashboard for creating/editing
│   ├── components/
│   │   ├── templates/         # E-Card templates (Cute, Elegant, Formal)
│   │   ├── forms/             # Form components
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       └── senangpay.ts       # Payment integration
└── public/                    # Static assets
```

## Payment Integration

The app uses senangPay for Malaysian payment processing:
- **FPX**: Online banking
- **E-Wallets**: TNG, GrabPay, Boost, ShopeePay
- **Development**: Mock payment processor for testing

## Database Schema

- **User**: User accounts
- **ECard**: Wedding cards with customization options
- **Wish**: Guest messages/wishes
- **Payment**: Payment transaction records

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for happy couples
