
"use client"; 
import { useEffect, useState } from "react";

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      alert('User added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add user.');
    }
    setForm({ username: "", email: "", password: "" });
    setShowAddForm(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <div className="backdrop-blur-md bg-white/20 rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-8 border border-white/30">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6">User Management</h1>
        <div className="flex flex-row gap-8">
          <button className="glassy-btn" onClick={() => setShowAddForm((v) => !v)}>Add User</button>
          <button className="glassy-btn">See Users</button>
          <button className="glassy-btn">Delete User</button>
        </div>
        {showAddForm && (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 w-80 bg-white/40 p-8 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md">
            <input
              className="rounded-lg px-4 py-2 bg-white/70 border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="username"
              placeholder="Name"
              value={form.username}
              onChange={handleInput}
              required
            />
            <input
              className="rounded-lg px-4 py-2 bg-white/70 border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInput}
              required
            />
            <input
              className="rounded-lg px-4 py-2 bg-white/70 border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInput}
              required
            />
            <button type="submit" className="glassy-btn mt-2">Submit</button>
          </form>
        )}
      </div>
      <style jsx>{`
        .glassy-btn {
          background: rgba(255,255,255,0.25);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          font-size: 1.25rem;
          font-weight: 600;
          padding: 0.75rem 2.5rem;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.15);
          backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .glassy-btn:hover {
          background: rgba(255,255,255,0.45);
          color: #4f46e5;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
        }
      `}</style>
    </main>
  );
}
