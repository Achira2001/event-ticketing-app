export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-8 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <p>© {new Date().getFullYear()} EventTix. All rights reserved.</p>
        <p className="mt-1 text-xs text-slate-500">Built with Next.js App Router & MongoDB</p>
      </div>
    </footer>
  );
}