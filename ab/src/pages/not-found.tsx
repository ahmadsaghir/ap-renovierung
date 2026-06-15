import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";

const PRIMARY = "#0D5C3A";
const LIME = "#C3EC54";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7FAFC" }}>
      {/* Top bar matching site header */}
      <div className="w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/">
          <span className="flex items-center gap-2 cursor-pointer">
            <img src="/ap-logo.png" alt="AP Renovierung" className="h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </span>
        </Link>
        <Link href="/">
          <span
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 cursor-pointer"
            style={{ background: PRIMARY }}
          >
            <Home size={15} />
            Zurück zur Startseite
          </span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          {/* 404 number */}
          <div className="relative mb-8 select-none">
            <span
              className="text-[10rem] font-extrabold leading-none tracking-tighter"
              style={{ color: "#E8F5EE" }}
            >
              404
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center text-[10rem] font-extrabold leading-none tracking-tighter"
              style={{ color: PRIMARY, opacity: 0.12 }}
              aria-hidden
            >
              404
            </span>
            {/* Lime accent line */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1.5 w-20 rounded-full"
              style={{ background: LIME }}
            />
          </div>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: "#B7DCC8", color: PRIMARY, background: "#E8F5EE" }}
          >
            Seite nicht gefunden
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2D3748] leading-tight mb-4">
            Diese Seite existiert nicht.
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            Die gesuchte Seite wurde möglicherweise verschoben, gelöscht oder hat
            nie existiert. Kehren Sie zur Startseite zurück und finden Sie, was Sie
            suchen.
          </p>

          <Link href="/">
            <span
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 shadow-lg cursor-pointer"
              style={{ background: PRIMARY }}
            >
              <ArrowLeft size={16} />
              Zurück zur Startseite
            </span>
          </Link>

          <p className="mt-8 text-xs text-gray-400">
            AP Renovierung — Renovieren. Gestalten. Pflegen.
          </p>
        </div>
      </div>
    </div>
  );
}
