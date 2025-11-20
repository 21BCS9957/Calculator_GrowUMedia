# Quick Start Guide

## Running the Calculator

1. **Install dependencies** (first time only):
   ```bash
   cd dodo-calculator
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - Navigate to: `http://localhost:3000/dodo-calculator`
   - Or start from home: `http://localhost:3000` and click the link

## How to Use

### Step 1: Add Client Payments
- Click "Add Client" to add rows for each client payment
- Fill in:
  - **Client Name** (optional): e.g., "Client A"
  - **Invoice ID** (optional): e.g., "INV-001"
  - **Amount USD** (required): e.g., "1000.00"
- Remove unwanted rows using the trash icon

### Step 2: Enter Payout Details
- **Payout Label**: Descriptive name like "Payout 1 – 1–15 Nov 2025"
- **Total INR Received**: The actual INR amount Dodo sent you (e.g., "84000.00")
- **Reference FX Rate**: Fair market rate in INR per 1 USD (e.g., "84.50")
  - Get this from Wise, Google, or RBI for the payout period

### Step 3: View Results
The calculator automatically shows:
- Total USD from all clients
- Expected INR at reference rate
- Actual INR received
- **Total Dodo Fees** (FX spread + platform charges combined)
- **Effective fee percentage**

## Example Scenario

**Clients paid:**
- Client A: $500
- Client B: $750
- Client C: $250
- **Total: $1,500**

**Payout details:**
- Reference FX rate: ₹84.50 per $1
- Expected INR: ₹126,750
- Actual INR received: ₹120,000

**Results:**
- Dodo Fees: ₹6,750
- Effective fee: ~5.32%

This tells you Dodo took about 5.32% through their FX spread and platform charges combined.

## Production Build

To build for production:
```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`

## Notes

- All calculations happen in the browser (no backend)
- Data is not saved (refresh clears everything)
- Works offline once loaded
- Mobile-responsive design
