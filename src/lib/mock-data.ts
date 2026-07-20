export const kpiData = [
  {
    label: "Total Leads",
    value: "2,487",
    change: "+18%",
    trend: "up",
    sparkline: [48, 60, 52, 68, 72, 84, 92],
  },
  {
    label: "Hot Leads",
    value: "324",
    change: "+12%",
    trend: "up",
    sparkline: [38, 42, 50, 48, 58, 66, 76],
  },
  {
    label: "Conversion Rate",
    value: "24.7%",
    change: "+5.4%",
    trend: "up",
    sparkline: [20, 21, 23, 24, 25, 24, 27],
  },
  {
    label: "Pipeline Value",
    value: "$482K",
    change: "+15%",
    trend: "up",
    sparkline: [30, 35, 40, 52, 58, 70, 84],
  },
];

export const qualityDistribution = [
  { name: "Hot Leads", value: 324, color: "#fb7185" },
  { name: "Warm Leads", value: 1087, color: "#facc15" },
  { name: "Cold Leads", value: 1076, color: "#60a5fa" },
];

export const leadsByDay = [
  { day: "Mon", leads: 45 },
  { day: "Tue", leads: 62 },
  { day: "Wed", leads: 78 },
  { day: "Thu", leads: 91 },
  { day: "Fri", leads: 87 },
  { day: "Sat", leads: 34 },
  { day: "Sun", leads: 22 },
];

export const funnelStages = [
  { stage: "New Lead", count: 2487, percent: 100 },
  { stage: "Qualified", count: 1642, percent: 66 },
  { stage: "Discovery Call", count: 1024, percent: 41 },
  { stage: "Proposal Sent", count: 614, percent: 25 },
  { stage: "Negotiation", count: 307, percent: 12 },
  { stage: "Won", count: 176, percent: 7 },
];

export const recentLeads = [
  {
    name: "John Smith",
    company: "Acme Inc",
    score: 92,
    temperature: "Hot",
    status: "Qualified",
    date: "2026-06-17",
  },
  {
    name: "Sarah Lee",
    company: "TechFlow",
    score: 74,
    temperature: "Warm",
    status: "Contacted",
    date: "2026-06-16",
  },
  {
    name: "Mike Davis",
    company: "StartupX",
    score: 48,
    temperature: "Cold",
    status: "New",
    date: "2026-06-15",
  },
  {
    name: "Emily Chen",
    company: "Northwind",
    score: 88,
    temperature: "Hot",
    status: "Meeting",
    date: "2026-06-14",
  },
];

export const insights = [
  "Hot leads from SaaS companies increased 23% this week.",
  "Leads with budgets above $10K convert 2.8x higher.",
  "Response time under 15 minutes increases close rate by 34%.",
];

export const workflowTimeline = [
  {
    step: "Lead Submitted",
    time: "09:14 AM",
    status: "complete",
  },
  {
    step: "AI Scored",
    time: "09:16 AM",
    status: "complete",
  },
  {
    step: "HubSpot Contact Created",
    time: "09:19 AM",
    status: "complete",
  },
  {
    step: "Deal Created",
    time: "09:25 AM",
    status: "in-progress",
  },
  {
    step: "Email Sent",
    time: "09:32 AM",
    status: "pending",
  },
  {
    step: "Slack Notification Sent",
    time: "09:35 AM",
    status: "pending",
  },
];

export const performanceMetrics = [
  { label: "Total Emails Sent", value: "12,480", accent: "from-cyan-500 to-blue-600" },
  { label: "Meetings Booked", value: "318", accent: "from-emerald-500 to-teal-600" },
  { label: "Revenue Generated", value: "$284K", accent: "from-indigo-500 to-violet-600" },
  { label: "Average AI Score", value: "81.6", accent: "from-rose-500 to-orange-500" },
];
