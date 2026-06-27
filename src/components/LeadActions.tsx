type Props = {
  id: string;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
};

export default function LeadActions({ id, onDelete, onEdit }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="text-yellow-600 hover:underline"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete?.(id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}