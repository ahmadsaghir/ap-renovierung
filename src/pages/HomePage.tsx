import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Hammer,
  PaintRoller,
  LayoutGrid,
  PackageOpen,
  Truck,
  Sprout,
  Zap,
  Phone,
  Mail,
  ArrowUpRight,
  Menu,
  X,
  CheckCircle,
  ChevronRight,
  Star,
} from "lucide-react";
import { Link } from "wouter";
import ContactModal from "@/components/BookingModal";

const PRIMARY = "#0D5C3A";
const PRIMARY_LIGHT = "#157A4C";
const LIME = "#C3EC54";
const FOOTER_BG = "#0B462C";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const SERVICE_CARDS = [
  {
    title: "Trockenbau",
    desc: "Professioneller Innenausbau & Wände",
    icon: Hammer,
  },
  {
    title: "Malerarbeiten",
    desc: "Sauber & präzise innen wie außen",
    icon: PaintRoller,
  },
  {
    title: "Bodenverlegung",
    desc: "Laminat, Parkett, Fliesen & mehr",
    icon: LayoutGrid,
  },
  {
    title: "Entrümpelungen",
    desc: "Zuverlässige Räumungen aller Art",
    icon: PackageOpen,
  },
  { title: "Umzüge", desc: "Stressfrei von A nach B", icon: Truck },
  {
    title: "Gartenarbeiten",
    desc: "Pflege & Gestaltung Ihres Gartens",
    icon: Sprout,
  },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactService, setContactService] = useState<string | null>(null);

  const openContact = (service: string | null = null) => {
    setContactService(service);
    setContactOpen(true);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#2D3748] font-sans overflow-x-hidden">
      {/* ── Top Bar ──────────────────────────────────────────── */}
      <div
        style={{ background: PRIMARY }}
        className="hidden md:block text-white text-sm py-2 px-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:017621761041"
              className="flex items-center gap-2 hover:text-[#C3EC54] transition-colors"
            >
              <Phone size={13} /> 0176 / 2176 1041
            </a>
            <a
              href="mailto:info@aprenovierung.de"
              className="flex items-center gap-2 hover:text-[#C3EC54] transition-colors"
            >
              <Mail size={13} /> info@aprenovierung.de
            </a>
          </div>
          <span className="font-semibold tracking-wide" style={{ color: LIME }}>
            Jederzeit für Sie da
          </span>
        </div>
      </div>

      {/* ── Navbar ───────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          <Link href="/">
            <img
              src={"/nav_logo.png"}
              alt="AP Renovierung"
              className="h-20 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            {[
              { label: "Startseite", id: "" },
              { label: "Leistungen", id: "services" },
              { label: "Über uns", id: "about" },
              { label: "Kontakt", id: "contact" },
            ].map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#0D5C3A] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() =>
                    item.id
                      ? scrollTo(item.id)
                      : window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="hover:text-[#0D5C3A] transition-colors"
                >
                  {item.label}
                </button>
              ),
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:017621761041"
              className="flex items-center gap-2 font-bold text-sm"
              style={{ color: PRIMARY }}
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "#E8F5EE" }}
              >
                <Phone size={15} style={{ color: PRIMARY }} />
              </span>
              <div className="leading-tight">
                <div className="text-[10px] text-gray-400 font-normal">
                  Jetzt anrufen
                </div>
                <div>0176 / 2176 1041</div>
              </div>
            </a>
            <button
              onClick={() => openContact()}
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: PRIMARY }}
            >
              Anfragen
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 px-6 flex flex-col gap-4 bg-white shadow-lg">
            <button
              onClick={() => scrollTo("services")}
              className="font-semibold text-gray-700 hover:text-[#0D5C3A] text-left"
            >
              Leistungen
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-left font-semibold text-gray-700 hover:text-[#0D5C3A]"
            >
              Über uns
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-left font-semibold text-gray-700 hover:text-[#0D5C3A]"
            >
              Kontakt
            </button>
            <a
              href="tel:017621761041"
              className="font-bold"
              style={{ color: PRIMARY }}
            >
              0176 / 2176 1041
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                openContact();
              }}
              className="w-full py-3 rounded-lg font-bold text-white"
              style={{ background: PRIMARY }}
            >
              Anfragen
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative pt-20 pb-40 px-6"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,61,39,0.82) 0%, rgba(13,92,58,0.72) 50%, rgba(21,122,76,0.65) 100%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: i % 2 === 0 ? PRIMARY_LIGHT : "#0B3D27",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-white text-sm font-semibold">
              Zufriedene Kunden
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            Renovieren. Gestalten. <span style={{ color: LIME }}>Pflegen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Ihr zuverlässiger Partner für Renovierung, Umzüge und Gartenpflege.
            Qualität aus einer Hand — sauber, fair und termingerecht.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openContact()}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 shadow-lg"
              style={{ background: LIME, color: PRIMARY }}
            >
              Kostenlos anfragen
              <span
                className="w-7 h-7 rounded border-2 flex items-center justify-center"
                style={{ borderColor: PRIMARY }}
              >
                <ArrowUpRight size={14} style={{ color: PRIMARY }} />
              </span>
            </button>
            <a
              href="tel:017621761041"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white border-2 border-white/30 hover:border-white/60 transition-all"
            >
              <Phone size={18} /> Jetzt anrufen
            </a>
          </motion.div>
        </div>

        {/* Overlapping Service Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="absolute -bottom-20 left-0 right-0 px-4 md:px-8"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.title}
                  variants={fadeUp}
                  onClick={() => openContact(card.title)}
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl text-white text-center hover:scale-105 transition-all duration-300 shadow-xl"
                  style={{ background: PRIMARY_LIGHT }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#C3EC54] group-hover:bg-[#B5DF50] transition-colors">
                    <Icon size={18} className="text-[#0d5c3a]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight">
                      {card.title}
                    </div>
                    <div className="text-white/70 text-xs mt-0.5 leading-snug hidden lg:block text-center">
                      {card.desc}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Spacer for overlapping cards */}
      <div className="h-24 md:h-28 bg-[#F7FAFC]" />

      {/* ── Stats Bar ────────────────────────────────────────── 
      <section className="py-10 px-6 bg-[#F7FAFC] border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "7+", label: "Leistungen" },
            { num: "100%", label: "Faire Preise" },
            { num: "Alles", label: "Aus einer Hand" },
            { num: "∞", label: "Zufriedene Kunden" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-extrabold mb-1"
                style={{ color: PRIMARY }}
              >
                {s.num}
              </div>
              <div className="text-gray-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
*/}
      {/* ── About Section ────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative"
          >
            <motion.div
              variants={fadeUp}
              className="text-6xl md:text-7xl font-extrabold mb-4"
              style={{ color: PRIMARY }}
            >
              25K+
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-gray-400 font-medium mb-8"
            >
              Zufriedene Kunden in ganz Deutschland
            </motion.p>

            {/* Partner image card */}
            <motion.div
              variants={fadeUp}
              className="relative rounded-2xl overflow-hidden shadow-xl h-72"
            >
              <img
                src="/Partner.png"
                alt="AP Renovierung Partner"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-sm font-semibold"
              style={{ borderColor: PRIMARY_LIGHT, color: PRIMARY_LIGHT }}
            >
              Über uns
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold text-[#2D3748] leading-tight mb-4"
            >
              Wir bei AP Renovierung glauben, dass jeder Raum sein Potenzial
              entfalten kann.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-500 leading-relaxed mb-8"
            >
              Ob Renovierung, Umzug oder Außenreinigung — wir bieten Ihnen
              professionelle Lösungen aus einer Hand. Gegründet mit einer
              Leidenschaft für Handwerk und Zuverlässigkeit, sind wir Ihr
              vertrauensvoller Partner für alle Rund-ums-Haus-Leistungen.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                variants={fadeUp}
                className="p-6 rounded-xl shadow-md"
                style={{ background: LIME }}
              >
                <h4
                  className="font-extrabold text-lg mb-2 leading-tight"
                  style={{ color: PRIMARY }}
                >
                  Ihr Zuhause in besten Händen
                </h4>
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: "#2D5C30" }}
                >
                  Saubere Arbeit. Faire Preise. Zufriedene Kunden.
                </p>
                <button
                  onClick={() => openContact()}
                  className="flex items-center gap-2 font-bold text-sm"
                  style={{ color: PRIMARY }}
                >
                  Mehr erfahren
                  <span
                    className="w-7 h-7 rounded border-2 flex items-center justify-center"
                    style={{ borderColor: PRIMARY }}
                  >
                    <ArrowUpRight size={13} />
                  </span>
                </button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="p-6 rounded-xl shadow-md text-white"
                style={{ background: PRIMARY }}
              >
                <div
                  className="text-4xl font-extrabold mb-1"
                  style={{ color: LIME }}
                >
                  100%
                </div>
                <div className="text-white/80 text-sm mb-3">
                  Qualitätsgarantie
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                  <div
                    className="h-2 rounded-full"
                    style={{ background: LIME, width: "90%" }}
                  />
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill={LIME} stroke="none" />
                  ))}
                </div>
                <button
                  onClick={() => openContact()}
                  className="flex items-center gap-2 font-bold text-sm text-white/80 hover:text-white transition-colors"
                >
                  Bewertungen ansehen <ArrowUpRight size={13} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services Overview ─────────────────────────────────── */}
      <section id="services" className="py-24 px-6 bg-[#F7FAFC]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-sm font-semibold"
              style={{ borderColor: PRIMARY_LIGHT, color: PRIMARY_LIGHT }}
            >
              Unsere Leistungen
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-extrabold text-[#2D3748] leading-tight"
            >
              Alles aus einer Hand
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Hammer,
                title: "Trockenbau",
                desc: "Professioneller Trockenbau, Wandverkleidungen und Innenausbau nach Maß.",
                cat: "Renovierung",
              },
              {
                icon: PaintRoller,
                title: "Malerarbeiten",
                desc: "Saubere Innen- und Außenmalerarbeiten — streichen, tapezieren, spachteln.",
                cat: "Renovierung",
              },
              {
                icon: LayoutGrid,
                title: "Bodenverlegung",
                desc: "Verlegung von Laminat, Parkett, Fliesen und weiteren Bodenbelägen.",
                cat: "Renovierung",
              },
              {
                icon: PackageOpen,
                title: "Entrümpelungen",
                desc: "Zuverlässige Entrümpelungen von Wohnungen, Kellern und Dachböden.",
                cat: "Umzüge",
              },
              {
                icon: Truck,
                title: "Umzüge",
                desc: "Stressfreie Umzüge — von der Verpackung bis zur Aufstellung am neuen Ort.",
                cat: "Umzüge",
              },
              {
                icon: Sprout,
                title: "Gartenarbeiten",
                desc: "Rasenmähen, Heckenschneiden, Bepflanzung und Gartenpflege.",
                cat: "Außenpflege",
              },
              {
                icon: Zap,
                title: "Hochdruckreinigung",
                desc: "Professionelle Reinigung von Einfahrten, Terrassen und Fassaden.",
                cat: "Außenpflege",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => openContact(s.title)}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110 duration-300"
                    style={{ background: "#E8F5EE" }}
                  >
                    <Icon size={22} style={{ color: PRIMARY }} />
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest mb-2 block"
                    style={{ color: PRIMARY_LIGHT }}
                  >
                    {s.cat}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#2D3748] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <div
                    className="flex items-center gap-1 font-bold text-sm transition-colors"
                    style={{ color: PRIMARY }}
                  >
                    Anfragen{" "}
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center mt-10">
            <button
              onClick={() => scrollTo("services")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ background: PRIMARY }}
            >
              Alle Leistungen ansehen <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact / Lead Gen Section ───────────────────────── */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Visual */}
            <div
              className="relative hidden lg:flex flex-col items-start justify-end p-14 min-h-[600px]"
              style={{
                backgroundImage: `url('/contact.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,61,39,0.85) 0%, rgba(11,61,39,0.4) 60%, rgba(11,61,39,0.15) 100%)",
                }}
              />
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  Bereit für Ihr
                  <br />
                  <span style={{ color: LIME }}>nächstes Projekt?</span>
                </h3>
                <p className="text-white/70 mb-8 text-base leading-relaxed max-w-sm">
                  Ob Renovierung, Umzug oder Gartenpflege — kontaktieren Sie uns
                  jetzt für ein kostenloses Angebot.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: Phone,
                      text: "0176 / 2176 1041",
                      href: "tel:017621761041",
                    },
                    {
                      icon: Mail,
                      text: "info@aprenovierung.de",
                      href: "mailto:info@aprenovierung.de",
                    },
                  ].map(({ icon: Icon, text, href }) => (
                    <a
                      key={text}
                      href={href}
                      className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                    >
                      <span
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.12)" }}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="text-sm font-medium">{text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-8 md:p-14 bg-white flex items-center">
              <div className="w-full max-w-md mx-auto">
                <div
                  className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-sm font-semibold"
                  style={{ borderColor: PRIMARY_LIGHT, color: PRIMARY_LIGHT }}
                >
                  Kontakt
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#2D3748] mb-2">
                  Jetzt kostenloses Angebot anfordern
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>

                <LeadForm onSubmit={openContact} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#F7FAFC]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-sm font-semibold"
              style={{ borderColor: PRIMARY_LIGHT, color: PRIMARY_LIGHT }}
            >
              Unsere Vorteile
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-extrabold text-[#2D3748]"
            >
              Qualität. Zuverlässigkeit. Faire Preise.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: CheckCircle,
                title: "Saubere Arbeit",
                desc: "Präzise ausgeführt, pünktlich geliefert — wir hinterlassen keine Unordnung, nur Ergebnisse.",
              },
              {
                icon: Star,
                title: "Faire Preise",
                desc: "Transparente Kostenvoranschläge ohne versteckte Extras. Was wir sagen, das halten wir.",
              },
              {
                icon: Phone,
                title: "Immer erreichbar",
                desc: "Jederzeit für Sie da — per Telefon oder WhatsApp. Schnelle Antworten, klare Absprachen.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "#E8F5EE" }}
                  >
                    <Icon size={24} style={{ color: PRIMARY }} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#2D3748] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ background: `linear-gradient(135deg, #0B3D27, #157A4C)` }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Ihr Traum-Zuhause ist nur einen Anruf entfernt
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Lassen Sie uns Ihren Raum verwandeln — professionell, zuverlässig,
            aus einer Hand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openContact()}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 shadow-lg"
              style={{ background: LIME, color: PRIMARY }}
            >
              Kostenlos anfragen{" "}
              <ArrowUpRight size={18} style={{ color: PRIMARY }} />
            </button>
            <a
              href="tel:017621761041"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white border-2 border-white/30 hover:border-white/60 transition-all"
            >
              <Phone size={18} /> 0176 / 2176 1041
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer
        id="contact"
        style={{ background: FOOTER_BG }}
        className="text-white pt-16 pb-8 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <img
                src={"/white_logo.png"}
                alt="AP Renovierung"
                className="h-26 w-auto object-contain mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
                AP Renovierung ist Ihr zuverlässiger Partner für professionelle
                Renovierungen, Umzüge und Gartenpflege — alles aus einer Hand.
              </p>
              <p className="font-bold text-sm" style={{ color: LIME }}>
                Jederzeit für Sie da
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-extrabold text-white mb-4 text-base">
                Leistungen
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                {[
                  "Trockenbau",
                  "Malerarbeiten",
                  "Bodenverlegung",
                  "Entrümpelungen",
                  "Umzüge",
                  "Gartenarbeiten",
                  "Hochdruckreinigung",
                ].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white transition-colors text-left"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-extrabold text-white mb-4 text-base">
                Kontakt
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="text-white/80">
                  Inhaber: <span className="text-white">Pavle Tomovski</span>
                </li>
                <li>
                  <a
                    href="tel:017621761041"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone size={13} /> 0176 / 2176 1041
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@aprenovierung.de"
                    className="flex items-center gap-2 hover:text-white transition-colors break-all"
                  >
                    <Mail size={13} /> info@aprenovierung.de
                  </a>
                </li>
              </ul>
              <button
                onClick={() => openContact()}
                className="mt-6 w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: LIME, color: PRIMARY }}
              >
                Jetzt anfragen
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
            <p>
              © {new Date().getFullYear()} AP Renovierung — Pavle Tomovski.
              Alle Rechte vorbehalten.
            </p>
            <p className="mt-2 md:mt-0">Renovieren. Gestalten. Pflegen.</p>
          </div>
        </div>
      </footer>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        initialService={contactService}
      />
    </div>
  );
}

/* ── Inline Lead Form ─────────────────────────────────── */
function LeadForm({
  onSubmit,
}: {
  onSubmit: (service: string | null) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const svc = service || null;
    const whatsappMsg = [
      `Hallo! Ich möchte ein kostenloses Angebot anfordern.`,
      ``,
      `Name: ${name}`,
      phone ? `Telefon: ${phone}` : "",
      email ? `E-Mail: ${email}` : "",
      svc ? `Leistung: ${svc}` : "",
      message ? `Nachricht: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/4917621761041?text=${encodeURIComponent(whatsappMsg)}`,
      "_blank",
    );
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0D5C3A] transition-colors placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
          className={inputClass}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
          className={inputClass}
        />
      </div>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefon"
        className={inputClass}
      />
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className={`${inputClass} bg-white`}
      >
        <option value="">Leistung auswählen</option>
        {[
          "Trockenbau",
          "Malerarbeiten",
          "Bodenverlegung",
          "Entrümpelungen",
          "Umzüge",
          "Gartenarbeiten",
          "Hochdruckreinigung",
        ].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ihre Nachricht (optional)"
        rows={4}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90"
        style={{ background: "#C3EC54", color: "#0D5C3A" }}
      >
        Jetzt senden
        <span
          className="w-7 h-7 rounded border-2 flex items-center justify-center"
          style={{ borderColor: "#0D5C3A" }}
        >
          <ArrowUpRight size={14} style={{ color: "#0D5C3A" }} />
        </span>
      </button>
    </form>
  );
}
