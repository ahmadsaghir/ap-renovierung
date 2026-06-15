import React, { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ChevronRight, ChevronLeft, X, Check, ArrowUpRight } from "lucide-react";
import {
  format,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
} from "date-fns";
import { de as deLocale } from "date-fns/locale";

const WHATSAPP_NUMBER = "4917621761041";
const TOTAL_STEPS = 4;
const PRIMARY = "#0D5C3A";
const LIME = "#C3EC54";
const MINUTES = ["00", "15", "30", "45"];
const DOW_LABELS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const STEP_TITLES = [
  "Ihr Name",
  "Leistungen auswählen",
  "Datum & Uhrzeit",
  "Anfrage-Übersicht",
];

const SERVICE_LIST = [
  "Trockenbau",
  "Malerarbeiten",
  "Bodenverlegung",
  "Entrümpelungen",
  "Umzüge",
  "Gartenarbeiten",
  "Hochdruckreinigung",
  "Hausmeisterservice",
];

function getAllowedHours(): string[] {
  return Array.from({ length: 12 }, (_, i) => (7 + i).toString().padStart(2, "0"));
}

interface ContactData {
  name: string;
  services: string[];
  date: string;
  time: string;
}

const EMPTY_DATA: ContactData = { name: "", services: [], date: "", time: "" };

function CalendarPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const today = startOfDay(new Date());
  const selectedDate = value ? startOfDay(new Date(value + "T00:00:00")) : null;
  const [viewDate, setViewDate] = useState<Date>(() => selectedDate ?? today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => setViewDate((d) => subMonths(d, 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#0D5C3A] transition-colors rounded-lg hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-bold text-gray-700">
          {format(viewDate, "MMMM yyyy", { locale: deLocale })}
        </span>
        <button type="button" onClick={() => setViewDate((d) => addMonths(d, 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#0D5C3A] transition-colors rounded-lg hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DOW_LABELS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const isPast = isBefore(date, today);
          const isSelected = selectedDate ? date.getTime() === selectedDate.getTime() : false;
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => !isPast && onChange(format(date, "yyyy-MM-dd"))}
              className={`h-9 w-full text-sm font-semibold rounded-lg transition-colors duration-150
                ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-[#E8F5EE] hover:text-[#0D5C3A] cursor-pointer text-gray-700"}
                ${isSelected ? "text-white font-bold" : ""}
              `}
              style={isSelected ? { background: PRIMARY } : {}}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  initialService?: string | null;
  initialOffer?: string | null;
}

export default function ContactModal({ open, onClose, initialService }: ContactModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ContactData>({ ...EMPTY_DATA });
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");

  useEffect(() => {
    if (open) {
      setStep(1);
      setData({ ...EMPTY_DATA, services: initialService ? [initialService] : [] });
      setHour("09");
      setMinute("00");
    }
  }, [open, initialService]);

  useEffect(() => {
    if (hour && minute) setData((d) => ({ ...d, time: `${hour}:${minute}` }));
  }, [hour, minute]);

  const canProceed = () => {
    if (step === 1) return data.name.trim().length > 0;
    if (step === 2) return data.services.length > 0;
    if (step === 3) return data.date !== "" && data.time !== "";
    return true;
  };

  const handleNext = () => { if (canProceed() && step < TOTAL_STEPS) setStep((s) => s + 1); };
  const handleBack = () => { if (step > 1) setStep((s) => s - 1); };

  const handleSendWhatsApp = () => {
    const msg = [
      `Hallo! Ich möchte eine Anfrage stellen.`,
      ``,
      `Name: ${data.name}`,
      `Leistungen:`,
      ...data.services.map((s, i) => `${i + 1}. ${s}`),
      `Wunschdatum: ${data.date ? format(new Date(data.date + "T00:00:00"), "dd.MM.yyyy", { locale: deLocale }) : "—"}`,
      `Wunschuhrzeit: ${data.time || "—"}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  const toggleService = (svc: string) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(svc) ? d.services.filter((s) => s !== svc) : [...d.services, svc],
    }));
  };

  const allowedHours = getAllowedHours();
  const selectClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white text-gray-700 focus:outline-none transition-colors";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl outline-none overflow-hidden"
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>Anfrage stellen</DialogPrimitive.Title>
          </VisuallyHidden.Root>

          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#157A4C" }}>
                  Schritt {step} von {TOTAL_STEPS}
                </p>
                <h2 className="text-xl font-extrabold text-[#2D3748]">{STEP_TITLES[step - 1]}</h2>
              </div>
              <DialogPrimitive.Close onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                <X size={18} />
              </DialogPrimitive.Close>
            </div>
            <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%`, background: PRIMARY }}
              />
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6 min-h-[280px] max-h-[58vh] overflow-y-auto">

            {/* Step 1: Name */}
            {step === 1 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Vollständiger Name
                </label>
                <input
                  type="text"
                  autoFocus
                  placeholder="z.B. Max Mustermann"
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleNext()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0D5C3A] transition-colors placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Einen oder mehrere Dienste auswählen
                </p>
                {SERVICE_LIST.map((svc) => {
                  const selected = data.services.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => toggleService(svc)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left text-sm font-semibold transition-all duration-200
                        ${selected
                          ? "border-[#0D5C3A] bg-[#E8F5EE] text-[#0D5C3A]"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#157A4C] hover:bg-gray-50"
                        }`}
                    >
                      <span>{svc}</span>
                      {selected && (
                        <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                          <Check size={13} className="text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
                {data.services.length > 0 && (
                  <p className="text-xs font-semibold mt-2 pt-2" style={{ color: PRIMARY }}>
                    {data.services.length} Leistung(en) ausgewählt
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Wunschdatum
                  </p>
                  <CalendarPicker value={data.date} onChange={(v) => setData((d) => ({ ...d, date: v }))} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Wunschuhrzeit
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Stunde</p>
                      <select value={hour} onChange={(e) => setHour(e.target.value)} className={selectClass} style={{ borderColor: "#E2E8F0" }}>
                        {allowedHours.map((h) => <option key={h} value={h}>{h}:00</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Minute</p>
                      <select value={minute} onChange={(e) => setMinute(e.target.value)} className={selectClass} style={{ borderColor: "#E2E8F0" }}>
                        {MINUTES.map((m) => <option key={m} value={m}>:{m}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Anfrage-Details überprüfen
                </p>
                <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                  <div className="flex justify-between items-center px-5 py-3.5 bg-gray-50">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Name</span>
                    <span className="text-sm font-bold text-[#2D3748]">{data.name}</span>
                  </div>
                  <div className="px-5 py-3.5">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Leistungen</p>
                    <ul className="space-y-1.5">
                      {data.services.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm font-medium text-[#2D3748]">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: PRIMARY }}>
                            <Check size={11} className="text-white" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center px-5 py-3.5 bg-gray-50">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Datum</span>
                    <span className="text-sm font-bold text-[#2D3748]">
                      {data.date ? format(new Date(data.date + "T00:00:00"), "dd.MM.yyyy", { locale: deLocale }) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-3.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Uhrzeit</span>
                    <span className="text-sm font-bold text-[#2D3748]">{data.time || "—"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex justify-between items-center gap-4">
            {step > 1 ? (
              <button type="button" onClick={handleBack} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-semibold">
                <ChevronLeft size={16} /> Zurück
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200
                  ${canProceed() ? "text-white hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
                `}
                style={canProceed() ? { background: PRIMARY } : {}}
              >
                Weiter <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 shadow-md"
                style={{ background: LIME, color: PRIMARY }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={PRIMARY}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.534 5.858L.057 23.61a.75.75 0 00.932.932l5.752-1.477A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 01-4.953-1.357l-.355-.211-3.682.945.963-3.524-.232-.367A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Via WhatsApp senden
                <span className="w-6 h-6 rounded border-2 flex items-center justify-center" style={{ borderColor: PRIMARY }}>
                  <ArrowUpRight size={12} style={{ color: PRIMARY }} />
                </span>
              </button>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
