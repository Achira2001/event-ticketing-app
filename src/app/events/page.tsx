"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, MapPin, Tag } from "lucide-react";

// Sample Events Data
const initialEvents = [
  {
    id: "1",
    title: "Tech Innovation Summit 2026",
    category: "Technology",
    date: "Aug 15, 2026",
    location: "Nelum Pokuna, Colombo",
    price: 3500,
    availableTickets: 24,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Summer Music Festival",
    category: "Music",
    date: "Sep 02, 2026",
    location: "Galle Face Green, Colombo",
    price: 5000,
    availableTickets: 8,
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Startup Founders Meetup",
    category: "Business",
    date: "Sep 20, 2026",
    location: "Trace Expert City, Colombo",
    price: 1500,
    availableTickets: 50,
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Digital Art & AI Exhibition",
    category: "Art",
    date: "Oct 05, 2026",
    location: "Lionel Wendt, Colombo",
    price: 2000,
    availableTickets: 15,
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&auto=format&fit=crop&q=80",
  }
];

const categories = ["All", "Technology", "Music", "Business", "Art"];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Search සහ Category Filter Logic එක
  const filteredEvents = initialEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100">Browse Events</h1>
        <p className="text-slate-400 text-sm mt-1">Find and book tickets for upcoming events in Sri Lanka</p>
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

      {/* Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
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
                    href={`/events/${event.id}`}
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
        <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-800">
          <p className="text-slate-400 text-base">No events found matching your criteria.</p>
        </div>
      )}

    </div>
  );
}