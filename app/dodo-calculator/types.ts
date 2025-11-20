// Types for the Dodo Fees Calculator

export interface ClientPayment {
  id: string;
  clientName: string;
  invoiceId: string;
  amountUsd: number | string;
}

export interface PayoutInputs {
  payoutLabel: string;
  totalInrReceived: number | string;
  referenceFxRateInrPerUsd: number | string;
}

export interface CalculationResults {
  totalUsd: number;
  expectedInr: number;
  actualInr: number;
  dodoFeesInr: number;
  effectiveFxRate: number;
  feePercentOnInr: number;
}
