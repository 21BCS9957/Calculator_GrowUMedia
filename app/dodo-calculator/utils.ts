// Utility functions for calculations

import { ClientPayment, CalculationResults } from './types';

/**
 * Calculate Dodo fees and related metrics
 */
export function calculateDodoFees(
  clients: ClientPayment[],
  totalInrReceived: number,
  referenceFxRate: number
): CalculationResults | null {
  // Sum up all client USD amounts
  const totalUsd = clients.reduce((sum, client) => {
    const amount = typeof client.amountUsd === 'string' 
      ? parseFloat(client.amountUsd) 
      : client.amountUsd;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  // Validate inputs
  if (totalUsd <= 0 || totalInrReceived <= 0 || referenceFxRate <= 0) {
    return null;
  }

  // Calculate expected INR at reference FX rate
  const expectedInr = totalUsd * referenceFxRate;

  // Calculate Dodo fees (difference between expected and actual)
  const dodoFeesInr = expectedInr - totalInrReceived;

  // Calculate effective FX rate we actually got
  const effectiveFxRate = totalInrReceived / totalUsd;

  // Calculate fee percentage on INR basis
  const feePercentOnInr = (dodoFeesInr / expectedInr) * 100;

  return {
    totalUsd,
    expectedInr,
    actualInr: totalInrReceived,
    dodoFeesInr,
    effectiveFxRate,
    feePercentOnInr,
  };
}

/**
 * Format number with specified decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) {
    return '–';
  }
  return value.toFixed(decimals);
}

/**
 * Format currency (INR)
 */
export function formatINR(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return '–';
  }
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format currency (USD)
 */
export function formatUSD(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return '–';
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
