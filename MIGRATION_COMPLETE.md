# Wedding E-Card - MongoDB & senangPay Migration Complete

## ✅ Completed Tasks

1. **MongoDB + Prisma Setup**
   - Prisma schema defined with User, ECard, Wish, and Payment models
   - Prisma client generated and configured
   - Database utilities created at `src/lib/prisma.ts`

2. **API Routes Refactored**
   - `/api/ecards` - Create and update E-Cards
   - `/api/payment/create` - Initiate payment (with senangPay integration)
   - `/api/payment/senangpay` - senangPay payment URL generation
   - `/api/payment/callback` - Handle senangPay callbacks
   - `/api/payment/mock-process` - Mock payment for development
   - `/api/wishes/create` - Submit guest wishes

3. **senangPay Integration**
   - Payment hashing utilities (`src/lib/senangpay.ts`)
   - Support for FPX, TNG E-Wallet, GrabPay, Boost, ShopeePay
   - Secure callback verification with HMAC-SHA256

4. **Components Updated**
   - All templates (Cute, Elegant, Formal) now support wish submission
   - CardForm updated to use new API endpoints
   - Dashboard updated to save/load from MongoDB

5. **Middleware**
   - Removed Supabase middleware
   - Basic middleware in place (ready for auth integration)

## 🔧 Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your MongoDB connection string
   - Add your senangPay credentials

3. **Setup MongoDB**
   - Create a MongoDB Atlas account (free tier available)
   - Create a new cluster
   - Get your connection string
   - Add it to `.env.local` as `DATABASE_URL`

4. **Setup senangPay**
   - Sign up at https://senangpay.my
   - Get your Merchant ID and Secret Key
   - Add them to `.env.local`

5. **Run Database Migrations** (if needed)
   ```bash
   npx prisma db push
   ```

6. **Generate Prisma Client** (if needed)
   ```bash
   npx prisma generate
   ```

7. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Notes

- Authentication is currently placeholder (using cookies for userId)
- You'll need to implement proper authentication (NextAuth.js, Clerk, etc.)
- Mock payment is available in development mode
- Production mode requires senangPay credentials

## 🎨 Features

- ✅ Three beautiful templates (Cute, Elegant, Formal)
- ✅ Live preview in dashboard
- ✅ RM10 unlock payment via senangPay
- ✅ Guest wish system
- ✅ Editable after payment
- ✅ Public card sharing via slug
