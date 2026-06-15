import {
  Hammer,
  PaintRoller,
  LayoutGrid,
  PackageOpen,
  Truck,
  Sprout,
  Zap,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "renovation" | "moving" | "outdoor" | "facility";

export interface ServiceConfig {
  imagePath: string;
  description: { de: string; en: string };
  icon: LucideIcon;
  category: ServiceCategory;
  price?: { amount: number; unit: "fixed" | "from"; currency: string };
  label?: { de: string; en: string };
}

export const CATEGORY_LABELS: Record<ServiceCategory, { de: string; en: string }> = {
  renovation: { de: "Renovierung & Innenausbau", en: "Renovierung & Innenausbau" },
  moving: { de: "Umzüge & Entrümpelungen", en: "Umzüge & Entrümpelungen" },
  outdoor: { de: "Außenpflege", en: "Außenpflege" },
  facility: { de: "Hausmeisterservice", en: "Hausmeisterservice" },
};

export const CATEGORY_ORDER: ServiceCategory[] = ["renovation", "moving", "outdoor", "facility"];

export const SERVICE_CONFIG: Record<string, ServiceConfig> = {
  "Trockenbau": {
    imagePath: "/services/trockenbau.webp",
    description: {
      de: "Professioneller Trockenbau, Wandverkleidungen und Innenausbau nach Maß",
      en: "Professioneller Trockenbau, Wandverkleidungen und Innenausbau nach Maß",
    },
    icon: Hammer,
    category: "renovation",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
  "Malerarbeiten": {
    imagePath: "/services/malerarbeiten.webp",
    description: {
      de: "Saubere Innen- und Außenmalerarbeiten — streichen, tapezieren, spachteln",
      en: "Saubere Innen- und Außenmalerarbeiten — streichen, tapezieren, spachteln",
    },
    icon: PaintRoller,
    category: "renovation",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
  "Bodenverlegung": {
    imagePath: "/services/bodenverlegung.webp",
    description: {
      de: "Verlegung von Laminat, Parkett, Fliesen und weiteren Bodenbelägen",
      en: "Verlegung von Laminat, Parkett, Fliesen und weiteren Bodenbelägen",
    },
    icon: LayoutGrid,
    category: "renovation",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
  "Entrümpelungen": {
    imagePath: "/services/entruempelungen.webp",
    description: {
      de: "Zuverlässige Entrümpelungen von Wohnungen, Kellern, Dachböden und Büros",
      en: "Zuverlässige Entrümpelungen von Wohnungen, Kellern, Dachböden und Büros",
    },
    icon: PackageOpen,
    category: "moving",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
  "Umzüge": {
    imagePath: "/services/umzuege.webp",
    description: {
      de: "Stressfreie Umzüge — von der Verpackung bis zur Aufstellung am neuen Ort",
      en: "Stressfreie Umzüge — von der Verpackung bis zur Aufstellung am neuen Ort",
    },
    icon: Truck,
    category: "moving",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
  "Gartenarbeiten": {
    imagePath: "/services/gartenarbeiten.webp",
    description: {
      de: "Rasenmähen, Heckenschneiden, Bepflanzung und saisonale Gartenpflege",
      en: "Rasenmähen, Heckenschneiden, Bepflanzung und saisonale Gartenpflege",
    },
    icon: Sprout,
    category: "outdoor",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
  "Hochdruckreinigung": {
    imagePath: "/services/hochdruckreinigung.jpg",
    description: {
      de: "Professionelle Hochdruckreinigung von Einfahrten, Terrassen, Fassaden und mehr",
      en: "Professionelle Hochdruckreinigung von Einfahrten, Terrassen, Fassaden und mehr",
    },
    icon: Zap,
    category: "outdoor",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
  "Hausmeisterservice": {
    imagePath: "/services/hausmeisterservice.jpg",
    description: {
      de: "Zuverlässiger Hausmeisterservice — Reparaturen, Wartung, Treppenhausreinigung und Kleinreparaturen",
      en: "Zuverlässiger Hausmeisterservice — Reparaturen, Wartung, Treppenhausreinigung und Kleinreparaturen",
    },
    icon: Wrench,
    category: "facility",
    label: { de: "Auf Anfrage", en: "Auf Anfrage" },
  },
};
