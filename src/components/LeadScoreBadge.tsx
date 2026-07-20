type LeadScoreBadgeProps = {
  score: number;
};

export default function LeadScoreBadge({ score }: LeadScoreBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700";
    if (score >= 50) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${getColor(score)}`}
    >
      {score}
    </span>
  );
}