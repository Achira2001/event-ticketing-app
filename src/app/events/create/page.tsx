"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, DollarSign, Ticket, Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";

const categories = ["Technology", "Music", "Business", "Art", "Sports", "Education"];

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    date: "",
    location: "",
    price: "",
    totalTickets: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          date: formData.date,
          location: formData.location,
          price: Number(formData.price),
          availableTickets: Number(formData.totalTickets),
          totalTickets: Number(formData.totalTickets),
          description: formData.description,
          imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create event");
      }

      // Redirect Event Page after success
      router.push("/events");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Events
      </Link>

      <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Organizer Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Create New Event</h1>
          <p className="text-slate-400 text-sm mt-1">Fill in the details below to publish your event live</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm p-3.5 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Event Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Colombo Tech Summit 2026"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Event Date *</label>
              <div className="relative">
                <input
                  type="text"
                  name="date"
                  required
                  placeholder="e.g. Aug 25, 2026"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Location & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Location / Venue *</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. BMICH, Colombo"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Ticket Price (LKR) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                placeholder="e.g. 2500"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Total Tickets & Banner Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Total Tickets Available *</label>
              <input
                type="number"
                name="totalTickets"
                required
                min="1"
                placeholder="e.g. 100"
                value={formData.totalTickets}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Image URL (Optional)</label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://images.unsplash.com/..."
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Event Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Provide full details about the event, speakers, agenda, etc."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publishing Event...</span>
              </>
            ) : (
              <span>Publish Event</span>
            )}
          </button>

        </form>
      </div>

    </div>
  );
}