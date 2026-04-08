import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { getOrders } from "@/lib/db/orders";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";

export const dynamic = "force-dynamic";

export const metadata = { robots: { index: false } };

export default async function AdminPage() {
  const host = (await headers()).get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    notFound();
  }

  const store = await cookies();
  const authed = store.get("admin_session")?.value === process.env.ADMIN_PASSWORD;

  if (!authed) return <AdminLogin />;

  const orders = await getOrders();
  return <AdminDashboard orders={orders} />;
}
