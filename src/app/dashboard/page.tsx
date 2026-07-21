import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  return <DashboardShell />;
}
