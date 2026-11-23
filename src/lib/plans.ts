import { FALLBACK_PLANS, type Plan } from "@/data/content";

/**
 * Busca os planos no backend (GET {GEOPAY_API_URL}/plans).
 * Sem a variável definida, ou se a API falhar, usa os planos de exemplo.
 * Ajuste o mapeamento abaixo ao formato real retornado pelo backend.
 */
export async function getPlans(): Promise<Plan[]> {
  const base = process.env.GEOPAY_API_URL;
  if (!base) return FALLBACK_PLANS;
  try {
    const res = await fetch(`${base}/plans`, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK_PLANS;
    const data = await res.json();
    const list: unknown[] = Array.isArray(data) ? data : data?.data ?? [];
    if (!list.length) return FALLBACK_PLANS;
    return list.slice(0, 3).map((raw, i) => {
      const p = raw as Record<string, unknown>;
      return {
        id: String(p.id ?? i),
        label: String(p.name ?? "PLANO").toUpperCase(),
        fee: String(p.fee ?? p.price ?? "—"),
        unit: "",
        sub: String(p.description ?? ""),
        features: Array.isArray(p.features) ? (p.features as string[]) : [],
        featured: i === 1,
        cta: "Começar",
      };
    });
  } catch {
    return FALLBACK_PLANS;
  }
}
