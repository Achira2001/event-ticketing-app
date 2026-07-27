"use client";

import Link from "next/link";
import { Ticket, Calendar, User, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-indigo-400 hover:text-indigo-300 transition">
          <Ticket className="w-6 h-6 text-indigo-500" />
          <span>EventTix</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/events" className="flex items-center gap-1.5 hover:text-indigo-400 transition">
            <Calendar className="w-4 h-4" />
            Events
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-indigo-400 transition">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/profile" className="flex items-center gap-1.5 hover:text-indigo-400 transition">
            <User className="w-4 h-4" />
            Profile
          </Link>
        </nav>

      </div>
    </header>
  );
}