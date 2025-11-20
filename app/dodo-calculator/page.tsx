'use client';

import { useState } from 'react';
import { ClientPayment, PayoutInputs } from './types';
import { calculateDodoFees, formatNumber, formatINR, formatUSD } from './utils';

export default function DodoCalculatorPage() {
  // State for client payments
  const [clients, setClients] = useState<ClientPayment[]>([
    { id: crypto.randomUUID(), clientName: '', invoiceId: '', amountUsd: '' },
  ]);

  // State for payout inputs
  const [payoutInputs, setPayoutInputs] = useState<PayoutInputs>({
    payoutLabel: '',
    totalInrReceived: '',
    referenceFxRateInrPerUsd: '',
  });

  // Add a new client row
  const addClient = () => {
    setClients([
      ...clients,
      { id: crypto.randomUUID(), clientName: '', invoiceId: '', amountUsd: '' },
    ]);
  };

  // Remove a client row
  const removeClient = (id: string) => {
    if (clients.length > 1) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  // Update client data
  const updateClient = (id: string, field: keyof ClientPayment, value: string | number) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, [field]: value } : client
      )
    );
  };

  // Calculate total USD from all clients
  const totalUsd = clients.reduce((sum, client) => {
    const amount = typeof client.amountUsd === 'string'
      ? parseFloat(client.amountUsd)
      : client.amountUsd;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  // Parse payout inputs
  const totalInrReceived = typeof payoutInputs.totalInrReceived === 'string'
    ? parseFloat(payoutInputs.totalInrReceived)
    : payoutInputs.totalInrReceived;

  const referenceFxRate = typeof payoutInputs.referenceFxRateInrPerUsd === 'string'
    ? parseFloat(payoutInputs.referenceFxRateInrPerUsd)
    : payoutInputs.referenceFxRateInrPerUsd;

  // Calculate results
  const results = calculateDodoFees(clients, totalInrReceived, referenceFxRate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Client Settlement Calculator
          </h1>
          <p className="text-slate-600">
            Calculate effective fees and FX spreads from Dodo Payments
          </p>
        </div>

        {/* Card 1: Client Payments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-slate-800">
              Client Payments (USD)
            </h2>
            <button
              onClick={addClient}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium"
            >
              + Add Client
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-slate-700">
                    Client Name
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-slate-700">
                    Invoice ID
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-slate-700">
                    Amount (USD) *
                  </th>
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-slate-100">
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={client.clientName}
                        onChange={(e) =>
                          updateClient(client.id, 'clientName', e.target.value)
                        }
                        placeholder="Client A"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={client.invoiceId}
                        onChange={(e) =>
                          updateClient(client.id, 'invoiceId', e.target.value)
                        }
                        placeholder="INV-001"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={client.amountUsd}
                        onChange={(e) =>
                          updateClient(client.id, 'amountUsd', e.target.value)
                        }
                        placeholder="1000.00"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                      />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => removeClient(client.id)}
                        disabled={clients.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                        title="Remove client"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-700">
                Total USD from Clients:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {formatUSD(totalUsd)}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Payout & FX Inputs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Payout & FX Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payout Label
              </label>
              <input
                type="text"
                value={payoutInputs.payoutLabel}
                onChange={(e) =>
                  setPayoutInputs({ ...payoutInputs, payoutLabel: e.target.value })
                }
                placeholder="Payout 1 – 1–15 Nov 2025"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Total INR Received from Dodo *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={payoutInputs.totalInrReceived}
                  onChange={(e) =>
                    setPayoutInputs({
                      ...payoutInputs,
                      totalInrReceived: e.target.value,
                    })
                  }
                  placeholder="84000.00"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Reference FX Rate (INR per 1 USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={payoutInputs.referenceFxRateInrPerUsd}
                  onChange={(e) =>
                    setPayoutInputs({
                      ...payoutInputs,
                      referenceFxRateInrPerUsd: e.target.value,
                    })
                  }
                  placeholder="84.50"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Results Summary */}
        {results && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-100">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Dodo Fees Summary
            </h2>

            {payoutInputs.payoutLabel && (
              <div className="mb-4 text-sm text-slate-600 italic">
                {payoutInputs.payoutLabel}
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-slate-700 font-medium">
                  Total USD Paid by Clients:
                </span>
                <span className="text-lg font-semibold text-slate-900">
                  {formatUSD(results.totalUsd)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-slate-700 font-medium">
                  Expected INR at Reference FX:
                </span>
                <span className="text-lg font-semibold text-slate-900">
                  {formatINR(results.expectedInr)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-slate-700 font-medium">
                  Actual INR Received from Dodo:
                </span>
                <span className="text-lg font-semibold text-green-700">
                  {formatINR(results.actualInr)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-slate-700 font-medium">
                  Total Dodo Fees (FX + Platform):
                </span>
                <span className="text-lg font-semibold text-red-600">
                  {formatINR(results.dodoFeesInr)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-slate-700 font-medium">
                  Effective FX Rate (INR per USD):
                </span>
                <span className="text-lg font-semibold text-slate-900">
                  ₹{formatNumber(results.effectiveFxRate, 4)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 bg-white rounded-md px-4 mt-4">
                <span className="text-slate-800 font-semibold text-lg">
                  Effective Fee % (vs Reference FX):
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {formatNumber(results.feePercentOnInr, 2)}%
                </span>
              </div>
            </div>

            {/* Summary sentence */}
            <div className="bg-white rounded-md p-4 text-sm text-slate-700 leading-relaxed border-l-4 border-blue-500">
              <p>
                Clients paid a total of <strong>{formatUSD(results.totalUsd)}</strong>. 
                At a reference rate of <strong>₹{formatNumber(referenceFxRate, 2)}</strong> per $1, 
                you should have received about <strong>{formatINR(results.expectedInr)}</strong>. 
                You actually received <strong>{formatINR(results.actualInr)}</strong>, 
                so Dodo effectively took <strong>{formatINR(results.dodoFeesInr)}</strong> (~
                <strong>{formatNumber(results.feePercentOnInr, 2)}%</strong>).
              </p>
            </div>
          </div>
        )}

        {/* Card 4: Per-Client Breakdown */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Per-Client INR Breakdown
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Effective INR received from each client (after Dodo fees)
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-700">
                      Client
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700">
                      USD Paid
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700">
                      Expected INR
                      <span className="block text-xs font-normal text-slate-500">
                        (at ref. rate)
                      </span>
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700">
                      Effective INR
                      <span className="block text-xs font-normal text-slate-500">
                        (actual received)
                      </span>
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700">
                      Dodo Fees
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => {
                    const clientUsd = typeof client.amountUsd === 'string'
                      ? parseFloat(client.amountUsd)
                      : client.amountUsd;
                    
                    if (isNaN(clientUsd) || clientUsd <= 0) return null;

                    const expectedInrForClient = clientUsd * referenceFxRate;
                    const effectiveInrForClient = clientUsd * results.effectiveFxRate;
                    const feesForClient = expectedInrForClient - effectiveInrForClient;
                    const clientLabel = client.clientName || client.invoiceId || `Client ${index + 1}`;

                    return (
                      <tr key={client.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-2 text-slate-900 font-medium">
                          {clientLabel}
                        </td>
                        <td className="py-3 px-2 text-right text-slate-900">
                          {formatUSD(clientUsd)}
                        </td>
                        <td className="py-3 px-2 text-right text-slate-700">
                          {formatINR(expectedInrForClient)}
                        </td>
                        <td className="py-3 px-2 text-right text-green-700 font-semibold">
                          {formatINR(effectiveInrForClient)}
                        </td>
                        <td className="py-3 px-2 text-right text-red-600">
                          {formatINR(feesForClient)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300 font-semibold">
                    <td className="py-3 px-2 text-slate-900">
                      Total
                    </td>
                    <td className="py-3 px-2 text-right text-slate-900">
                      {formatUSD(results.totalUsd)}
                    </td>
                    <td className="py-3 px-2 text-right text-slate-900">
                      {formatINR(results.expectedInr)}
                    </td>
                    <td className="py-3 px-2 text-right text-green-700">
                      {formatINR(results.actualInr)}
                    </td>
                    <td className="py-3 px-2 text-right text-red-600">
                      {formatINR(results.dodoFeesInr)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Validation message when results can't be calculated */}
        {!results && (totalUsd > 0 || totalInrReceived > 0 || referenceFxRate > 0) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            Please ensure all required fields are filled with valid positive numbers to see the calculation results.
          </div>
        )}
      </div>
    </div>
  );
}
