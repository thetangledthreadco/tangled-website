"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderStatus } from "@/lib/db/orderTypes";
import { STATUS_LABELS, STATUS_FLOW } from "@/lib/db/orderTypes";
import { adminLogout } from "@/lib/actions/adminActions";
import OrderList from "./OrderList";
import OrderPanel from "./OrderPanel";
import NewOrderForm from "./NewOrderForm";

export default function AdminDashboard({ orders: initialOrders }: { orders: Order[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [hideCancelled, setHideCancelled] = useState(true);

  // Apply the hide-cancelled toggle before any status filter
  const visibleOrders = hideCancelled
    ? orders.filter((o) => o.status !== "cancelled")
    : orders;

  const filtered = filterStatus === "all"
    ? visibleOrders
    : visibleOrders.filter((o) => o.status === filterStatus);

  const selected = !showNewOrder ? (orders.find((o) => o.id === selectedId) ?? null) : null;

  const handleOrderUpdate = (updated: Partial<Order> & { id: string }) => {
    setOrders((prev) => prev.map((o) => o.id === updated.id ? { ...o, ...updated } : o));
  };

  const handleOrderCreated = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setShowNewOrder(false);
    setSelectedId(order.id);
  };

  const handleLogout = async () => {
    await adminLogout();
    router.refresh();
  };

  const filterOptions: Array<"all" | OrderStatus> = ["all", ...STATUS_FLOW];

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-10 pt-20 bg-warm-white border-b border-border">
        <div className="px-6 md:px-10 py-5 flex items-center justify-between">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-0.5">Admin</p>
            <h1 className="font-serif text-2xl text-brown">
              Orders
              <span className="font-sans text-base font-normal text-muted ml-2">({visibleOrders.length})</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setShowNewOrder(true); setSelectedId(null); }}
              className="px-4 py-2 bg-rose text-warm-white font-sans text-sm font-medium rounded hover:bg-rose-dark transition-colors cursor-pointer"
            >
              + New order
            </button>
            <button
              onClick={handleLogout}
              className="font-sans text-sm text-muted hover:text-rose transition-colors cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Status filter tabs + hide-cancelled toggle */}
        <div className="px-6 md:px-10 pb-0 flex items-end justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto flex-1 min-w-0">
            {filterOptions.map((s) => {
              const count = s === "all"
                ? visibleOrders.length
                : visibleOrders.filter((o) => o.status === s).length;
              return (
                <button
                  key={s}
                  onClick={() => { setFilterStatus(s); setShowNewOrder(false); }}
                  className={`pb-3 px-1 font-sans text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    filterStatus === s && !showNewOrder
                      ? "border-rose text-rose"
                      : "border-transparent text-muted hover:text-brown"
                  }`}
                >
                  {s === "all" ? "All" : STATUS_LABELS[s]}
                  <span className="ml-1.5 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
          {(() => {
            const cancelledCount = orders.filter((o) => o.status === "cancelled").length;
            if (cancelledCount === 0) return null;
            return (
              <label className="shrink-0 pb-3 flex items-center gap-2 cursor-pointer select-none">
                <span className="relative inline-block w-9 h-5">
                  <input
                    type="checkbox"
                    checked={hideCancelled}
                    onChange={(e) => setHideCancelled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <span className="block w-full h-full rounded-full bg-border peer-checked:bg-rose transition-colors" />
                  <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                </span>
                <span className="font-sans text-xs text-muted whitespace-nowrap">
                  Hide cancelled ({cancelledCount})
                </span>
              </label>
            );
          })()}
        </div>
      </div>

      {/* List + detail/new-order panel */}
      <div className="flex flex-1 overflow-hidden">
        <OrderList
          orders={filtered}
          selectedId={selectedId}
          onSelect={(id) => { setSelectedId(id); setShowNewOrder(false); }}
        />
        {showNewOrder ? (
          <NewOrderForm
            onCreated={handleOrderCreated}
            onCancel={() => setShowNewOrder(false)}
          />
        ) : selected ? (
          <OrderPanel
            key={selected.id}
            order={selected}
            onUpdate={handleOrderUpdate}
            onClose={() => setSelectedId(null)}
          />
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center text-muted font-sans text-sm">
            Select an order to view details.
          </div>
        )}
      </div>
    </div>
  );
}
