'use client';
import PageHeader from '@/app/admin/PageHeader';
import { useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Deal, DealStage } from '@/types/deal';

type Lead = {
  id: number;
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  company?: string;
};

function leadLabel(lead?: Lead): string {
  if (!lead) return 'Unknown Lead';
  return (
    lead.name ||
    lead.full_name ||
    [lead.first_name, lead.last_name].filter(Boolean).join(' ') ||
    lead.company ||
    lead.email ||
    `Lead #${lead.id}`
  );
}

const STAGES: { key: DealStage; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'border-t-blue-500' },
  { key: 'contacted', label: 'Contacted', color: 'border-t-yellow-500' },
  { key: 'negotiation', label: 'Negotiation', color: 'border-t-purple-500' },
  { key: 'won', label: 'Won', color: 'border-t-green-500' },
  { key: 'lost', label: 'Lost', color: 'border-t-red-500' },
];

export default function DealsKanbanPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  useEffect(() => {
    loadDeals();
    loadLeads();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/deals');
      if (!res.ok) throw new Error('Failed to fetch deals');
      const data = await res.json();
      setDeals(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load deals');
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

  const leadMap = new Map(leads.map((l) => [l.id, l]));

  function handleDragStart(event: DragStartEvent) {
    const deal = deals.find((d) => d.id === Number(event.active.id));
    setActiveDeal(deal ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const dealId = Number(active.id);
    const newStage = over.id as DealStage;

    const deal = deals.find((d) => d.id === dealId);
    if (!deal || deal.stage === newStage) return;

    const prevDeals = deals;

    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d))
    );

    try {
      const res = await fetch(`/api/deals/${dealId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });
      if (!res.ok) throw new Error('Update failed');
    } catch (err) {
      console.error(err);
      setDeals(prevDeals);
      setError('Failed to update deal stage');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="text-gray-500">Loading deals...</div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-full mx-auto">
        
        <PageHeader
  title="Deals"
  description="Manage your sales pipeline and deals"
  badge={`${deals.length} visible deals`}
/>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => (
              <Column
                key={stage.key}
                stage={stage}
                deals={deals.filter((d) => d.stage === stage.key)}
                leadMap={leadMap}
              />
            ))}
          </div>

          <DragOverlay>
            {activeDeal ? (
              <DealCard deal={activeDeal} lead={leadMap.get(activeDeal.lead_id)} isOverlay />
            ) : null}
          </DragOverlay>
        </DndContext>
        
      </div>
    </div>
  );
}

function Column({
  stage,
  deals,
  leadMap,
}: {
  stage: { key: DealStage; label: string; color: string };
  deals: Deal[];
  leadMap: Map<number, Lead>;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.key });

  const total = deals.reduce((sum, d) => sum + Number(d.value ?? 0), 0);

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 rounded-lg p-3 w-72 flex-shrink-0 min-h-[500px] border-t-4 ${stage.color} transition ${
        isOver ? 'bg-gray-200 ring-2 ring-blue-300' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-sm text-gray-800">{stage.label}</h2>
        <span className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded-full">
          {deals.length}
        </span>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        ${total.toLocaleString()}
      </div>

      <div className="flex flex-col gap-2">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} lead={leadMap.get(deal.lead_id)} />
        ))}
        {deals.length === 0 && (
          <div className="text-xs text-gray-400 text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
            No deals
          </div>
        )}
      </div>
    </div>
  );
}

function DealCard({
  deal,
  lead,
  isOverlay,
}: {
  deal: Deal;
  lead?: Lead;
  isOverlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-md p-3 shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing ${
        isOverlay ? 'shadow-lg rotate-2' : 'hover:shadow-md'
      }`}
    >
      <p className="text-sm font-medium text-gray-900">{deal.title}</p>
      <p className="text-xs text-gray-500 mt-1">{leadLabel(lead)}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-semibold text-blue-600">
          ${Number(deal.value ?? 0).toLocaleString()}
        </span>
        {deal.probability != null && (
          <span className="text-xs text-gray-400">{deal.probability}%</span>
        )}
      </div>
    </div>
  );
}