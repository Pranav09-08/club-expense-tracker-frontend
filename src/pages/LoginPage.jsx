import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
    window.location.href = "/admin-dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full max-w-md bg-white border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Login</h2>

        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}