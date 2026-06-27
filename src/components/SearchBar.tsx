"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search leads..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full mb-4"
    />
  );
}