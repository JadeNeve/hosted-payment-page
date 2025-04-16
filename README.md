# Hosted Payment Page

This is a fully responsive [Next.js](https://nextjs.org/) 15+ project built with the App Router, TypeScript, React 19, [shadcn/ui](https://ui.shadcn.com/), and React Query. It integrates directly with the BVNK sandbox API for generating and processing payment quotes.

---

## 🔧 Features

- Automatic quote generation and redirection
- Secure Hawk-authenticated API calls
- 3-step payment flow:
  - Accept Quote
  - Pay Quote (with QR code and BTC address)
  - Expired Page
- Countdown logic for time-sensitive quotes
- Fully typed, professional-grade folder structure
- Styled using Tailwind CSS and ShadCN components

---

## Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/your-username/hosted-payment-page.git
cd hosted-payment-page
```

---

### 2. Install Dependencies

Using **npm**:

```bash
npm install
```

Or using **yarn**:

```bash
yarn install
```

---

### 3. Setup Environment Variables

Rename `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update the new `.env.local` file with the correct values:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.sandbox.bvnk.com/api/v1
NEXT_PUBLIC_HAWK_AUTH_ID=your_hawk_id_here
NEXT_PUBLIC_HAWK_AUTH_KEY=your_hawk_key_here
NEXT_PUBLIC_MERCHANT_ID=your_merchant_id_here
```

---

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open your browser and go to:

```
http://localhost:3000
```

You’ll be redirected to a generated payment quote flow.

---

## Folder Structure

```txt
src/
├── app/
│   ├── page.tsx                   # Auto-generates quote and redirects
│   ├── payin/[uuid]/              # Dynamic routes for each quote
│   │   ├── page.tsx               # Accept Quote Page
│   │   ├── pay.tsx                # Pay Quote Page
│   │   └── expired.tsx            # Expired Quote Page
├── components/                    # UI components (buttons, cards, selects)
├── config/                        # env.ts + react-query setup
├── hooks/                         # React Query custom hooks
├── lib/                           # Hawk header + API setup
├── types/                         # Strong TypeScript typings
└── utils/                         # Utility functions like random ID generation
```

---

## Tech Stack

- **Next.js 15+** with App Router
- **TypeScript**
- **React 19**
- **React Query**
- **Tailwind CSS**
- **shadcn/ui**
- **Axios**
- **QRCode Generator**
