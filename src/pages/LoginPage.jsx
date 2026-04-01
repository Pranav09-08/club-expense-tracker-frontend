import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "@/api/authAPI";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        email: email.trim(),
        password: password.trim(),
      };

      const result = await login(payload);
      window.location.href = result.dashboardPath;
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl items-center justify-center">
        <section className="w-full bg-white/50 p-6 backdrop-blur-sm sm:p-8">
          <h2 className="mb-1 text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="mb-6 text-sm text-slate-500">Access your role dashboard and manage club operations quickly.</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                value={email}
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-slate-400"
                placeholder="name@club.in"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                value={password}
                type="password"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-slate-400"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={!email.trim() || !password.trim() || loading}
              className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Back to{" "}
              <Link to="/" className="font-medium text-slate-700 underline-offset-2 hover:underline">
                home page
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
