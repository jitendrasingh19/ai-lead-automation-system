'use client';

import { useEffect, useState } from 'react';
import type { Deal, DealStage } from '@/types/deal';

const STAGE_COLORS: Record<DealStage, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  negotiation: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

type Lead = {
  id: number;
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  company?: string;
};

function leadLabel(lead: Lead): string {
  return (
    lead.name ||
    lead.full_name ||
    [lead.first_name, lead.last_name].filter(Boolean).join(' ') ||
    lead.company ||
    lead.email ||
    `Lead #${lead.id}`
  );
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDeal, setNewDeal] = useState<{
    title: string;
    value: number;
    stage: DealStage;
    lead_id: number | '';
  }>({ title: '', value: 0, stage: 'new', lead_id: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadDeals();
    loadLeads();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/deals');

      if (!res.ok) {
        throw new Error('Failed to fetch deals');
      }

      const data = await res.json();
      setDeals(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Failed to load deals:', err);
      setError(err instanceof Error ? err.message : 'Failed to load deals');
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (!res.ok) throw new Error('Failed to fetch leads');
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load leads:', err);
    }
  };

  const handleAddDeal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDeal.lead_id) {
      setError('Please select a lead for this deal');
      return;
    }

    try {
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDeal),
      });

      if (!res.ok) {
        throw new Error('Failed to create deal');
      }

      const deal = await res.json();
      setDeals([deal, ...deals]);
      setNewDeal({ title: '', value: 0, stage: 'new', lead_id: '' });
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Failed to create deal:', err);
      setError(err instanceof Error ? err.message : 'Failed to create deal');
    }
  };

  const handleUpdateStage = async (dealId: string, newStage: DealStage) => {
    try {
      const res = await fetch(`/api/deals/${dealId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });

      if (!res.ok) {
        throw new Error('Failed to update deal');
      }

      const updatedDeal = await res.json();
      setDeals(deals.map(d => d.id === dealId ? updatedDeal : d));
    } catch (err) {
      console.error('Failed to update deal:', err);
      setError(err instanceof Error ? err.message : 'Failed to update deal');
    }
  };

  const handleDeleteDeal = async (dealId: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;

    try {
      const res = await fetch(`/api/deals/${dealId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete deal');
      }

      setDeals(deals.filter(d => d.id !== dealId));
    } catch (err) {
      console.error('Failed to delete deal:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete deal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Deals</h1>
            <p className="text-gray-600 mt-2">Manage your sales pipeline and deals</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {showForm ? 'Cancel' : 'Add Deal'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleAddDeal} className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={newDeal.lead_id}
                onChange={(e) => setNewDeal({ ...newDeal, lead_id: e.target.value ? Number(e.target.value) : '' })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select Lead</option>
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {leadLabel(lead)}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Deal Title"
                value={newDeal.title}
                onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Deal Value"
                value={newDeal.value}
                onChange={(e) => {
                  const parsed = parseFloat(e.target.value);
                  setNewDeal({ ...newDeal, value: isNaN(parsed) ? 0 : parsed });
                }}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newDeal.stage}
                onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value as DealStage })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition w-full"
            >
              Create Deal
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading deals...</div>
          </div>
        ) : deals.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
            <div className="text-gray-500 mb-4">No deals found</div>
            <button
              onClick={() => setShowForm(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first deal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">{deal.title}</h3>
                  <button
                    onClick={() => handleDeleteDeal(deal.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    ${Number(deal.value ?? 0).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Stage</label>
                  <select
                    value={deal.stage}
                    onChange={(e) => handleUpdateStage(deal.id, e.target.value as DealStage)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium ${STAGE_COLORS[deal.stage as DealStage]}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}