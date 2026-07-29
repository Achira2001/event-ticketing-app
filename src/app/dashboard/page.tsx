"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket, Calendar, MapPin, CheckCircle2, Clock, DollarSign, ArrowRight } from "lucide-react";

// Sample Booked Tickets Data
const initialBookings = [
  {
    id: "BK-8041",
    eventTitle: "Tech Innovation Summit 2026",
    category: "Technology",
    date: "Aug 15, 2026",
    location: "Nelum Pokuna, Colombo",
    ticketCount: 2,
    totalAmount: 7000,
    status: "Upcoming",
    bookedOn: "Jul 28, 2026",
  },
  {
    id: "BK-3022",
    eventTitle: "Summer Music Festival",
    category: "Music",
    date: "Sep 02, 2026",
    location: "Galle Face Green, Colombo",
    ticketCount: 1,
    totalAmount: 5000,
    status: "Upcoming",
    bookedOn: "Jul 29, 2026",
  },
  {
    id: "BK-1002",
    eventTitle: "AI & Future of Work Workshop",
    category: "Technology",
    date: "May 10, 2026",
    location: "BMICH, Colombo",
    ticketCount: 1,
    totalAmount: 2500,
    status: "Completed",
    bookedOn: "May 01, 2026",
  },
];

export default function DashboardPage() {
  const [bookings] = useState(initialBookings);

  const totalTickets = bookings.reduce((sum, item) => sum + item.ticketCount, 0);
  const totalSpent = bookings.reduce((sum, item) => sum + item.totalAmount, 0);
  const upcomingCount = bookings.filter((b) => b.status === "Upcoming").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100">User Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your event tickets and view booking history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Upcoming Events</span>
            <span className="text-2xl font-extrabold text-slate-100 mt-1 block">{upcomingCount}</span>
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Tickets Booked</span>
            <span className="text-2xl font-extrabold text-slate-100 mt-1 block">{totalTickets}</span>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Spent</span>
            <span className="text-2xl font-extrabold text-slate-100 mt-1 block">LKR {totalSpent.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Booked Tickets List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-200">My Tickets</h2>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 rounded-xl p-5 flex flex-col justify-between space-y-4 transition"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/50">
                      {item.id}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                        item.status === "Upcoming"
                          ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/50"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100">{item.eventTitle}</h3>

                  <div className="space-y-1 text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400">Tickets: </span>
                    <span className="font-bold text-slate-100">{item.ticketCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Amount: </span>
                    <span className="font-bold text-indigo-400">LKR {item.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-800 space-y-3">
            <p className="text-slate-400">You have no booked tickets yet.</p>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium text-sm"
            >
              Explore events to book <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}