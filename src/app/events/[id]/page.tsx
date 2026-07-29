"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Ticket, ShieldCheck, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  price: number;
  availableTickets: number;
  description: string;
  imageUrl: string;
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  // Database එකෙන් Single Event එක Fetch කිරීම
  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        const data = await res.json();
        if (data.success) {
          setEvent(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch event details:", err);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-slate-400 text-sm">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Event Not Found</h2>
        <p className="text-slate-400 text-sm">The event you are looking for does not exist or has been removed.</p>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

  const totalAmount = event.price * ticketCount;

  const handleBooking = () => {
    setIsBooked(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Event Image & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-indigo-400 text-xs font-semibold px-3 py-1 rounded-md border border-slate-700">
              {event.category}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">{event.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>{event.location}</span>
              </div>
            </div>

            <hr className="border-slate-800 my-4" />

            <div>
              <h2 className="text-lg font-bold text-slate-200 mb-2">About This Event</h2>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Checkout Box */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-6 sticky top-24 space-y-6">
            
            <div className="flex justify-between items-baseline border-b border-slate-700/50 pb-4">
              <span className="text-slate-400 text-sm">Ticket Price</span>
              <span className="text-2xl font-bold text-slate-100">LKR {event.price.toLocaleString()}</span>
            </div>

            {/* Ticket Counter */}
            {!isBooked ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Select Tickets</label>
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg p-2">
                    <button
                      onClick={() => setTicketCount((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-md bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-100">{ticketCount}</span>
                    <button
                      onClick={() => setTicketCount((prev) => Math.min(event.availableTickets, prev + 1))}
                      className="w-8 h-8 rounded-md bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block text-right">
                    Only {event.availableTickets} tickets left!
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm py-2">
                  <span className="text-slate-400">Total Amount</span>
                  <span className="text-xl font-bold text-indigo-400">LKR {totalAmount.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <Ticket className="w-5 h-5" />
                  Book Tickets Now
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Instant Ticket Delivery & Secure Booking</span>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Booking Successful!</h3>
                <p className="text-xs text-slate-400">
                  You have booked {ticketCount} ticket(s) for LKR {totalAmount.toLocaleString()}.
                </p>
                <Link
                  href="/dashboard"
                  className="block w-full bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-semibold py-2.5 rounded-xl transition mt-4"
                >
                  View My Tickets
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}