"use client";

import type { Order, OrderStatus } from "@/lib/db/orderTypes";
import { STATUS_LABELS } from "@/lib/db/orderTypes";

interface Props {
  orders: Order[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const STATUS_COLORS: Partial<Record<OrderStatus, string>> = {
  new:                  "bg-rose/10 text-rose",
  waiting_deposit:      "bg-amber-50 text-amber-700",
  waiting_shipment:     "bg-amber-50 text-amber-700",
  ready_to_stitch:      "bg-blue-50 text-blue-600",
  in_progress:          "bg-green-50 text-green-700",
  awaiting_pickup_ship: "bg-purple-50 text-purple-600",
  ready_to_ship:        "bg-purple-50 text-purple-600",
  complete:             "bg-oat text-muted",
};

export default function OrderList({ orders, selectedId, onSelect }: Props) {
  if (orders.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted font-sans text-sm">
        No orders.
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 lg:w-96 shrink-0 border-r border-border overflow-y-auto">
      {orders.map((order) => (
        <button
          key={order.id}
          onClick={() => onSelect(order.id)}
          className={`w-full text-left px-6 py-5 border-b border-border transition-colors ${
            selectedId === order.id ? "bg-oat" : "bg-warm-white hover:bg-cream"
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="font-sans text-sm font-medium text-ink">
              {order.first_name} {order.last_name}
            </span>
            <span className={`shrink-0 font-sans text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[order.status] ?? "bg-oat text-muted"}`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>
          <p className="font-sans text-xs text-muted capitalize">
            {order.item_type.replace(/-/g, " ")}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="font-sans text-xs text-muted/60">
              {new Date(order.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {(order.deposit_paid || order.final_paid || order.photo_taken) && (
              <span className="flex gap-1">
                {order.deposit_paid && <span title="Deposit paid" className="text-xs">💰</span>}
                {order.final_paid && <span title="Final paid" className="text-xs">✅</span>}
                {order.photo_taken && <span title="Photo taken" className="text-xs">📷</span>}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
