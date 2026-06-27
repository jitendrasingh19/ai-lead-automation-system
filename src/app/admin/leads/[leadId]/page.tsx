type PageProps = {
  params: Promise<{
    leadId: string;
  }>;
};

const leads = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

export default async function LeadDetailsPage({ params }: PageProps) {
  const { leadId } = await params;

  const lead = leads.find((l) => l.id === leadId);

  if (!lead) {
    return <h1>Lead not found</h1>;
  }

  return (
    <div>
      <h1>{lead.name}</h1>
      <p>{lead.email}</p>
    </div>
  );
}