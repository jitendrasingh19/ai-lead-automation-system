// src/components/ConvertToDealButton.tsx

"use client";

import { useRouter } from "next/navigation";

type Props = {
  leadId: string;
};

export default function ConvertToDealButton({ leadId }: Props) {
  const router = useRouter();

  const handleConvert = async () => {
  try {
    const res = await fetch("/api/deals/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ leadId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to convert lead");
      return;
    }

    alert("Deal created successfully!");

    router.push("/admin/deals");
    router.refresh();
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

  return (
    <button
      onClick={handleConvert}
      className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
    >
      Convert to Deal
    </button>
  );
}