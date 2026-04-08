"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/actions/adminActions";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await adminLogin(password);
    if (result.ok) {
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm bg-warm-white border border-border rounded p-10">
        <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-2">
          Admin
        </p>
        <h1 className="font-serif text-3xl text-brown mb-8">Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block font-sans text-sm font-medium text-ink mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 rounded border border-border bg-cream font-sans text-base text-ink focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose/50 transition-colors"
            />
            {error && <p className="font-sans text-xs text-rose mt-1.5">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
