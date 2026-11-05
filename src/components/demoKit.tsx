import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Clock, MapPin, Star, X } from "lucide-react";
import "../demo.css";

/* =========================================================
   Peças compartilhadas por todas as demos.
   Todas leem as variáveis de tema definidas em <Wrap theme={...}>.
   ========================================================= */

export type Theme = Record<string, string>;

export const Wrap = ({ theme, children }: { theme: Theme; children: ReactNode }) => (
  <div className="d" style={theme as CSSProperties}>{children}</div>
);

export function Section({ id, alt, inv, children }: { id?: string; alt?: boolean; inv?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-12 ${alt ? "bg-d-surface" : inv ? "bg-d-inv" : ""}`}>
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">{children}</div>
    </section>
  );
}

export const Heading = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="mb-10 max-w-2xl">
    <h2 className="d-display text-4xl leading-tight md:text-5xl">{title}</h2>
    {sub && <p className="text-d-muted mt-3">{sub}</p>}
  </div>
);

export function DemoNav({ brand, links, cta, ctaHref }: { brand: string; links: [string, string][]; cta: string; ctaHref: string }) {
  return (
    <header className="border-d-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <span className="d-display text-xl md:text-2xl">{brand}</span>
        <nav className="hidden gap-6 text-sm md:flex">
          {links.map(([l, h]) => <a key={h} href={h} className="link-d">{l}</a>)}
        </nav>
        <a href={ctaHref} className="btn-d btn-d-sm">{cta}</a>
      </div>
    </header>
  );
}

export const DemoFooter = ({ children }: { children: ReactNode }) => (
  <footer className="border-d-t">
    <div className="mx-auto max-w-5xl space-y-2 px-5 py-8 text-sm text-d-muted">{children}</div>
  </footer>
);

/* Imagem: usa `src` se existir; senão desenha um placeholder elegante com a paleta do tema.
   Para trocar por foto real, é só passar src="/fotos/arquivo.jpg". */
export function Pic({ i = 0, label, icon, src, className = "" }: { i?: number; label?: string; icon?: ReactNode; src?: string; className?: string }) {
  if (src) return <img src={src} alt={label ?? ""} loading="lazy" className={`object-cover ${className}`} />;
  const pos = [[20, 10], [80, 90], [50, 100], [10, 70]][i % 4];
  const angle = [135, 200, 320, 60][i % 4];
  return (
    <div
      role="img"
      aria-label={label ?? "Imagem ilustrativa"}
      className={`relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 90% at ${pos[0]}% ${pos[1]}%, var(--accent) -20%, transparent 62%), linear-gradient(${angle}deg, var(--surface), var(--bg))` }}
    >
      <div className="absolute inset-0 grid place-items-center opacity-40">{icon}</div>
      {label && <span className="text-d-muted absolute bottom-3 left-3 text-xs">{label}</span>}
    </div>
  );
}

export function Accordion({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-d-t">
      {items.map(([q, a], i) => (
        <div key={q} className="border-d-b">
          <button
            className="d-display flex w-full items-center justify-between gap-4 py-5 text-left text-xl"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {q}
            <ChevronDown className={`text-d-accent shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="pop text-d-muted max-w-2xl pb-5">{a}</p>}
        </div>
      ))}
    </div>
  );
}

export function Quotes({ items, stars }: { items: { name: string; text: string; role?: string }[]; stars?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((q) => (
        <figure key={q.name} className="border-d r-d flex flex-col justify-between gap-5 p-6">
          <div>
            {stars && (
              <div className="text-d-accent mb-3 flex gap-0.5" aria-label="5 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((n) => <Star key={n} size={16} fill="currentColor" />)}
              </div>
            )}
            <blockquote>“{q.text}”</blockquote>
          </div>
          <figcaption className="text-sm">
            <span className="font-semibold">{q.name}</span>
            {q.role && <span className="text-d-muted"> · {q.role}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Info({ address, hours }: { address: string; hours: [string, string][] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <p className="flex gap-3"><MapPin className="text-d-accent mt-0.5 shrink-0" size={20} />{address}</p>
        <div className="flex gap-3">
          <Clock className="text-d-accent mt-0.5 shrink-0" size={20} />
          <dl className="w-full space-y-1.5">
            {hours.map(([d, h]) => (
              <div key={d} className="border-d-b flex justify-between gap-4 pb-1.5 text-sm">
                <dt className="text-d-muted">{d}</dt><dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Pic i={2} label="O mapa do Google Maps aparece aqui" icon={<MapPin size={48} />} className="r-d min-h-56" />
    </div>
  );
}

/* ---------- Galeria com filtro + lightbox ---------- */

export type GItem = { cat: string; label: string; icon?: ReactNode };

export function Gallery({ items, cats }: { items: GItem[]; cats: string[] }) {
  const [cat, setCat] = useState("Todos");
  const [open, setOpen] = useState<number | null>(null);
  const list = items.filter((x) => cat === "Todos" || x.cat === cat);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);

  const cur = open === null ? null : list[open];
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {["Todos", ...cats].map((c) => (
          <button key={c} className="chip-d text-sm" aria-pressed={cat === c} onClick={() => { setCat(c); setOpen(null); }}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {list.map((x, k) => (
          <button key={x.label} onClick={() => setOpen(k)} className="r-d group overflow-hidden" aria-label={`Ampliar: ${x.label}`}>
            <Pic i={k} label={x.label} icon={x.icon} className="aspect-square transition duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.label} className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4" onClick={() => setOpen(null)}>
          <div className="pop relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <Pic i={open ?? 0} label={cur.label} icon={cur.icon} className="r-d aspect-[4/5] w-full" />
            <button autoFocus aria-label="Fechar" onClick={() => setOpen(null)} className="btn-d btn-d-ghost absolute right-3 top-3" style={{ background: "var(--bg)", padding: ".5rem" }}><X size={18} /></button>
            <button aria-label="Anterior" onClick={() => setOpen((open! - 1 + list.length) % list.length)} className="btn-d btn-d-ghost absolute left-3 top-1/2" style={{ background: "var(--bg)", padding: ".5rem" }}><ChevronLeft size={18} /></button>
            <button aria-label="Próxima" onClick={() => setOpen((open! + 1) % list.length)} className="btn-d btn-d-ghost absolute right-3 top-1/2" style={{ background: "var(--bg)", padding: ".5rem" }}><ChevronRight size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Agendamento simulado em passos ---------- */

export type Opt = { value: string; label: string; sub?: string; group?: string };
export type Field = { key: string; label: string; type?: string; placeholder?: string };
export type Step =
  | { key: string; title: string; type: "choice"; options: Opt[] }
  | { key: string; title: string; type: "when"; slots: string[] }
  | { key: string; title: string; type: "form"; fields: Field[] };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function nextDays(n = 6) {
  const out: string[] = [];
  const base = new Date();
  for (let i = 0; out.length < n; i++) {
    const x = new Date(base);
    x.setDate(base.getDate() + i);
    if (x.getDay() === 0) continue; // sem domingo
    const dd = String(x.getDate()).padStart(2, "0");
    const wd = cap(x.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""));
    out.push(i === 0 ? `Hoje ${dd}` : i === 1 ? `Amanhã ${dd}` : `${wd} ${dd}`);
  }
  return out;
}

// alguns horários aparecem como ocupados, para a demo parecer de verdade
const busy = (day: string, slot: string) => [...(day + slot)].reduce((a, c) => a + c.charCodeAt(0), 0) % 4 === 0;

export function Wizard({ steps, summary, doneTitle, doneText }: {
  steps: Step[];
  summary: (a: Record<string, string>) => [string, string][];
  doneTitle: string;
  doneText: string;
}) {
  const [i, setI] = useState(0);
  const [a, setA] = useState<Record<string, string>>({});
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const days = useMemo(() => nextDays(), []);
  const s = steps[i];
  const set = (k: string, v: string) => setA((p) => ({ ...p, [k]: v }));

  const ready =
    s.type === "choice" ? !!a[s.key]
    : s.type === "when" ? !!a[s.key + "_day"] && !!a[s.key + "_slot"]
    : s.fields.every((f) => a[f.key]?.trim());

  const next = () => {
    if (s.type === "form") {
      const e: Record<string, string> = {};
      s.fields.forEach((f) => {
        const v = (a[f.key] ?? "").trim();
        if (f.type === "tel" && v.replace(/\D/g, "").length < 10) e[f.key] = "Informe o DDD e o número.";
        else if (v.length < 2) e[f.key] = "Preencha este campo.";
      });
      setErr(e);
      if (Object.keys(e).length) return;
    }
    if (i < steps.length - 1) setI(i + 1);
    else setDone(true);
  };

  const reset = () => { setA({}); setErr({}); setI(0); setDone(false); };

  if (done) {
    return (
      <div role="status" className="pop border-d-accent r-d border p-8 text-center md:p-10">
        <span className="bg-d-accent text-d-onaccent mx-auto grid h-14 w-14 place-items-center rounded-full"><Check /></span>
        <h3 className="d-display mt-5 text-3xl">{doneTitle}</h3>
        <p className="text-d-muted mx-auto mt-2 max-w-md">{doneText}</p>
        <dl className="border-d r-d mx-auto mt-6 max-w-sm divide-y p-4 text-left text-sm" style={{ borderColor: "var(--line)" }}>
          {summary(a).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2"><dt className="text-d-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
          ))}
        </dl>
        <button onClick={reset} className="btn-d btn-d-ghost mt-6">Fazer outro agendamento</button>
      </div>
    );
  }

  return (
    <div className="border-d r-d p-6 md:p-8">
      <div className="mb-6 flex gap-1.5" aria-hidden>
        {steps.map((st, k) => <span key={st.key} className={`h-1 flex-1 rounded-full ${k <= i ? "bg-d-accent" : "bg-d-line"}`} />)}
      </div>
      <p className="text-d-muted text-sm">Passo {i + 1} de {steps.length}</p>
      <h3 className="d-display mb-5 text-2xl md:text-3xl">{s.title}</h3>

      <div key={i} className="pop">
        {s.type === "choice" && (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {s.options.map((o, k) => (
              <div key={o.value} className="contents">
                {o.group && o.group !== s.options[k - 1]?.group && (
                  <p className="text-d-muted mt-3 text-sm font-semibold sm:col-span-2">{o.group}</p>
                )}
                <button className="chip-d" aria-pressed={a[s.key] === o.value} onClick={() => set(s.key, o.value)}>
                  <span className="block font-medium">{o.label}</span>
                  {o.sub && <span className="block text-sm opacity-75">{o.sub}</span>}
                </button>
              </div>
            ))}
          </div>
        )}

        {s.type === "when" && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {days.map((d) => (
                <button key={d} className="chip-d" aria-pressed={a[s.key + "_day"] === d}
                  onClick={() => { set(s.key + "_day", d); if (a[s.key + "_slot"] && busy(d, a[s.key + "_slot"])) set(s.key + "_slot", ""); }}>
                  {d}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {s.slots.map((h) => (
                <button key={h} className="chip-d" disabled={!a[s.key + "_day"] || busy(a[s.key + "_day"], h)}
                  aria-pressed={a[s.key + "_slot"] === h} onClick={() => set(s.key + "_slot", h)}>
                  {h}
                </button>
              ))}
            </div>
            {!a[s.key + "_day"] && <p className="text-d-muted text-sm">Escolha um dia para ver os horários livres.</p>}
          </div>
        )}

        {s.type === "form" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {s.fields.map((f) => (
              <label key={f.key} className="block text-sm">
                <span className="text-d-muted mb-1.5 block">{f.label}</span>
                <input className="field-d" type={f.type ?? "text"} placeholder={f.placeholder} value={a[f.key] ?? ""}
                  aria-invalid={!!err[f.key]} onChange={(e) => set(f.key, e.target.value)} />
                {err[f.key] && <span role="alert" className="mt-1 block text-red-500">{err[f.key]}</span>}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button disabled={i === 0} onClick={() => setI(i - 1)} className="btn-d btn-d-ghost">Voltar</button>
        <button disabled={!ready} onClick={next} className="btn-d">{i < steps.length - 1 ? "Continuar" : "Confirmar agendamento"}</button>
      </div>
    </div>
  );
}
