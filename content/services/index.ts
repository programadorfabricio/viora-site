import type { ServicePageContent } from "@/content/types";
import sofa from "./sofa";
import colchao from "./colchao";
import poltronasCadeiras from "./poltronas-cadeiras";
import tapetes from "./tapetes";
import automotiva from "./automotiva";

export const servicePages: ServicePageContent[] = [sofa, colchao, poltronasCadeiras, tapetes, automotiva];

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages.find((page) => page.slug === slug);
}
