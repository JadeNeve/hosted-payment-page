# Hosted Payment Page (HPP) – Technical Assessment

This project is a **Hosted Payment Page (HPP)** built using **React + TypeScript + Vite**, styled with **Radix UI** and designed to match the provided **Figma spec**. It integrates with the **BVNK sandbox API** to simulate a real-world crypto payment flow.

---

## Features Implemented

### Accept Quote Page `/payin/:uuid`
- Fetches quote summary via `GET /pay/:uuid/summary`
- Displays merchant name, payment amount, and transaction reference
- Select dropdown (BTC, ETH, LTC) to update the quote
- Updates quote using `PUT /pay/:uuid/update/summary`
- Countdown timer using `acceptanceExpiryDate` (30s)
- Shows amount due, quote expiry, and confirm button after currency selection
- Confirms quote via `PUT /pay/:uuid/accept/summary` and redirects to Pay Quote

### Pay Quote Page `/payin/:uuid/pay`
- Fetches confirmed quote via `GET /pay/:uuid/summary`
- Displays "Pay with Bitcoin" summary
- Shows:
  - Amount due (with copy to clipboard)
  - Address (with copy to clipboard)
  - QR code
  - Countdown timer based on `expiryDate`

### Expired Page `/payin/:uuid/expired`
- Shown when `status: EXPIRED` or the expiry date passes

---

## Tech Stack

- React + Vite + TypeScript
- Radix UI (Primitives and Layout)
- Custom components: `Container`, `SelectCurrency`, `InfoRowCard`, etc.
- React Query for all API integration
- Custom Countdown Timer Hook
- Clipboard copy functionality
- Routing via React Router

---

## API Integration

### Postman
Use the provided `payments.postman_collection.json` and `sandbox.postman_environment.json` files to:
- Create new quotes
- Simulate quote updates
- Accept quotes

> Quotes must be regenerated if expired or already accepted.

---

## Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/JadeNeve/hosted-payment-page.git

# 2. Navigate into the project
cd hosted-payment-page

# 3. Install dependencies
yarn install

# 4. Rename the environment file
mv .env.example .env.local

# 5. Add your credentials to `.env.local`
VITE_APP_API_URL=https://api.sandbox.bvnk.com/api/v1
VITE_APP_HAWK_ID=your-hawk-id
VITE_APP_HAWK_KEY=your-hawk-key
VITE_APP_MERCHANT_ID=your-merchant-id

# 6. Run the dev server
yarn dev

