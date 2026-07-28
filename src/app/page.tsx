import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles, Search } from "lucide-react";

// Sample Data 
const dummyEvents = [
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
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Discover & Book Events Instantly</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Your Gateway to Unforgettable <span className="text-indigo-400">Live Experiences</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Book tickets for tech conferences, music concerts, startup meetups, and local events with zero hassle.
          </p>

          {/* Search Bar Preview */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3.5 rounded-lg transition shadow-lg shadow-indigo-600/30"
            >
              <Search className="w-4 h-4" />
              Explore All Events
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Featured Events</h2>
            <p className="text-slate-400 text-sm mt-1">Handpicked events happening around you</p>
          </div>

          <Link
            href="/events"
            className="text-indigo-400 hover:text-indigo-300 font-medium text-sm flex items-center gap-1 transition"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyEvents.map((event) => (
            <div
              key={event.id}
              className="bg-slate-800/50 rounded-xl border border-slate-700/60 overflow-hidden hover:border-slate-600 transition group flex flex-col"
            >
              {/* Event Image */}
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

              {/* Event Details */}
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

                {/* Price and Action Button */}
                <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Price</span>
                    <span className="text-lg font-bold text-slate-100">LKR {event.price.toLocaleString()}</span>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-medium px-3.5 py-1.5 rounded-md text-sm transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}