"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, MapPin, Loader2 } from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  price: number;
  availableTickets: number;
  imageUrl: string;
}

const categories = ["All", "Technology", "Music", "Business", "Art", "Sports", "Education"];

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch Events from Database via API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success) {
          setEvents(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Search ans Category Filter Logic 
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100">Browse Events</h1>
          <p className="text-slate-400 text-sm mt-1">Discover live events hosted across Sri Lanka</p>
        </div>

        <Link
          href="/events/create"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 text-center"
        >
          + Create Event
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by event title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 hidden lg:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-slate-400 text-sm">Fetching events from database...</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        /* Event Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-slate-800/50 rounded-xl border border-slate-700/60 overflow-hidden hover:border-slate-600 transition group flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700">
                  {event.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Price</span>
                    <span className="text-lg font-bold text-slate-100">LKR {event.price.toLocaleString()}</span>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-1.5 rounded-md text-sm transition"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-800 space-y-3">
          <p className="text-slate-400 text-base">No events found matching your criteria.</p>
          <Link
            href="/events/create"
            className="inline-block text-indigo-400 hover:text-indigo-300 text-xs font-semibold"
          >
            Be the first to publish an event!
          </Link>
        </div>
      )}

    </div>
  );
}