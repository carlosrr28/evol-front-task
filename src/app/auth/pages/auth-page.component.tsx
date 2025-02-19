import { useState } from "react";

export default function AuthPage() {
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", "loggedIn"); // Simula autenticación
    window.location.href = "/dashboard"; // Redirige al dashboard
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold">Login</h2>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <input
            type="taxt"
            placeholder="usurio"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
