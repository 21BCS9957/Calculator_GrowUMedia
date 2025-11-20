# Dodo Fees Conversion Calculator

A Next.js-based internal tool to calculate effective fees and FX spreads from Dodo Payments.

## Overview

This calculator helps you understand how much Dodo Payments effectively charges (FX spread + platform fees) by comparing:
- What clients paid in USD
- What you actually received in INR
- A reference FX rate (e.g., from Wise/Google/RBI)

## Features

- **Dynamic client table**: Add/remove multiple client payment entries
- **Real-time calculations**: Instant feedback as you enter data
- **Comprehensive metrics**:
  - Total USD from clients
  - Expected INR at reference FX rate
  - Actual INR received
  - Total Dodo fees (combined FX + platform)
  - Effective FX rate you received
  - Effective fee percentage
- **Clean UI**: Built with Tailwind CSS for a professional look
- **Fully typed**: TypeScript throughout for type safety

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 19**

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd dodo-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000/dodo-calculator
```

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Add Client Payments**:
   - Click "Add Client" to add rows
   - Enter client name (optional), invoice ID (optional), and USD amount (required)
   - Remove rows using the trash icon

2. **Enter Payout Details**:
   - Payout Label: A descriptive label for this payout period
   - Total INR Received: The actual INR amount Dodo sent you
   - Reference FX Rate: The fair market rate (INR per 1 USD) for comparison

3. **View Results**:
   - The summary card shows all calculated metrics
   - See exactly how much Dodo took and what percentage that represents

## Project Structure

```
dodo-calculator/
├── app/
│   ├── dodo-calculator/
│   │   ├── page.tsx       # Main calculator component
│   │   ├── types.ts       # TypeScript type definitions
│   │   └── utils.ts       # Calculation and formatting utilities
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Future Enhancements

Potential features to add:
- CSV export of calculations
- Save/load payout presets
- Historical comparison charts
- Multi-currency support
- Batch import from CSV

## Notes

- This is a **client-side only** calculator (no backend/database)
- All calculations happen in the browser
- Data is not persisted (refresh will clear inputs)
- Designed for internal use by finance/operations teams

## License

Internal tool - All rights reserved
