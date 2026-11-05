import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Plus, Check, ArrowUpRight } from "lucide-react";
import Logo from "../components/Logo";
import Reveal from "../components/Reveal";
import { config, wa } from "../config";

/* ---------- dados ---------- */

type Demo = {
  id: string;
  name: string;
  text: string;
  tags: string[];
  ready?: boolean; // só a barbearia está pronta por enquanto
  span: string; // largura no grid de 6 colunas
  // paleta do preview (cada nicho mostra a própria identidade)
  bg: string;
  ink: string;
  accent: string;
};

const demos: Demo[] = [
  { id: "barbearia", name: "Barbearia", text: "Agende o corte sem trocar mensagem.", tags: ["Agendamento", "Galeria"], ready: true, span: "md:col-span-4", bg: "#0d0c0a", ink: "#f5f5f4", accent: "#fbbf24" },
  { id: "restaurante", name: "Restaurante", text: "Cardápio digital que vira pedido.", tags: ["Cardápio", "Carrinho"], ready: true, span: "md:col-span-2", bg: "#2a1410", ink: "#f6e7d0", accent: "#c2410c" },
  { id: "advocacia", name: "Advocacia", text: "Presença sóbria, dentro das regras da OAB.", tags: ["Institucional", "Artigos"], ready: true, span: "md:col-span-2", bg: "#0f1d3a", ink: "#e8e4d8", accent: "#c9a24b" },
  { id: "salao", name: "Salão de Beleza", text: "Antes e depois que encanta.", tags: ["Slider", "Agendamento"], ready: true, span: "md:col-span-4", bg: "#f1e4dc", ink: "#3a2a2a", accent: "#b76e79" },
  { id: "clinica", name: "Clínica", text: "Confiança desde o primeiro clique.", tags: ["Consulta", "FAQ"], ready: true, span: "md:col-span-6", bg: "#eaf7f6", ink: "#0f3b3a", accent: "#2bb5b0" },
];

const steps = [
  ["Você escolhe o modelo", "Navegue pelas demos e fique com a que mais combina com o seu negócio."],
  ["Nós personalizamos", "Colocamos sua marca, suas fotos, seus serviços e seus preços."],
  ["Seu site no ar", "Em poucos dias você já recebe clientes pelo WhatsApp."],
];

const included = [
  "Design responsivo", "Botão de WhatsApp", "Google Maps", "SEO básico",
  "Domínio", "Hospedagem", "Formulário de contato", "Integração com Instagram",
];

const plans = [
  { name: "Essencial", price: "500", text: "Uma página, WhatsApp e mapa.", hot: false },
  { name: "Profissional", price: "800", text: "Várias seções, agendamento e SEO.", hot: true },
  { name: "Completo", price: "1.000", text: "Tudo isso, mais Instagram e blog.", hot: false },
];

const faq = [
  ["Qual o prazo?", "Em poucos dias úteis depois que você enviar logo, fotos e textos."],
  ["O que preciso enviar?", "Logo, fotos, serviços, preços e horários. A gente ajuda no resto."],
  ["Posso alterar depois?", "Sim. Ajustes de texto e fotos estão incluídos."],
  ["Como funciona o pagamento?", "O pagamento não é feito pelo site. Combinamos tudo direto com você pelo WhatsApp, antes de começar."],
  ["E domínio e hospedagem?", "Cuidamos dos dois para você."],
];

const links = [
  ["Demos", "#demos"],
  ["Como funciona", "#como"],
  ["Preços", "#precos"],
  ["Contato", "#contato"],
];

/* ---------- peças pequenas ---------- */

function Button({ href, children, solid, ...rest }: { href: string; children: ReactNode; solid?: boolean; target?: string; rel?: string }) {
  return (
    <a
      href={href}
      {...rest}
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wide transition ${
        solid ? "bg-brand text-white hover:bg-white hover:text-black" : "border-2 border-white text-white hover:bg-white hover:text-black"
      }`}
    >
      {children}
    </a>
  );
}

function Title({ children, outline }: { children: ReactNode; outline?: ReactNode }) {
  return (
    <h2 className="font-display text-5xl uppercase leading-[0.95] md:text-7xl">
      {children}
      {outline && (
        <>
          <br />
          <span className="text-outline">{outline}</span>
        </>
      )}
    </h2>
  );
}

// Linha do título do hero: sobe de dentro de uma "máscara" (classe .rise do CSS)
function RiseLine({ children, delay, outline }: { children: ReactNode; delay: number; outline?: boolean }) {
  return (
    <span className="block overflow-hidden py-[0.06em]">
      <span className={`rise ${outline ? "text-outline" : ""}`} style={{ animationDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

// Mini-site desenhado em CSS com a paleta do nicho
function Preview({ d }: { d: Demo }) {
  return (
    <div className="relative h-52 overflow-hidden md:h-64" style={{ background: d.bg }}>
      <div className="absolute inset-x-5 top-5 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full" style={{ background: d.ink, opacity: 0.35 }} />
        ))}
      </div>
      <div className="absolute inset-x-5 top-14 transition duration-500 group-hover:-translate-y-1">
        <div className="h-7 w-3/5" style={{ background: d.ink }} />
        <div className="mt-2 h-7 w-2/5" style={{ background: d.accent }} />
        <div className="mt-5 h-2 w-4/5" style={{ background: d.ink, opacity: 0.35 }} />
        <div className="mt-2 h-2 w-3/5" style={{ background: d.ink, opacity: 0.35 }} />
        <div className="mt-6 h-9 w-28" style={{ background: d.accent }} />
      </div>
      <div className="absolute -bottom-10 -right-6 h-32 w-32 rotate-12 transition duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ background: d.accent, opacity: 0.9 }} />
    </div>
  );
}

/* ---------- página ---------- */

export default function Home() {
  const [open, setOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const marquee = ["Barbearia", "Restaurante", "Advocacia", "Salão de beleza", "Clínica"];

  return (
    <main>
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/15 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#" aria-label="Avance, início"><Logo /></a>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="text-white/70 transition hover:text-white">{label}</a>
            ))}
          </nav>
          <a href={wa()} className="hidden bg-brand px-5 py-2.5 text-sm font-bold uppercase transition hover:bg-white hover:text-black md:block">
            {config.cta.whatsapp}
          </a>
          <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="pop flex flex-col border-t border-white/15 px-5 pb-4 md:hidden">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-display text-2xl uppercase">
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 md:pt-40">
        <h1 className="font-display text-[clamp(3.2rem,12vw,10rem)] uppercase leading-[0.95]">
          <RiseLine delay={0}>Seu negócio</RiseLine>
          <RiseLine delay={90}>merece um site</RiseLine>
          <RiseLine delay={180}>que vende</RiseLine>
          <RiseLine delay={270} outline>por você.</RiseLine>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-white/70">
            Escolha o seu nicho, navegue pela demo como se fosse o seu site e chame a gente quando estiver convencido.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button solid href="#demos">{config.cta.see}</Button>
            <Button href={wa()} target="_blank" rel="noreferrer">{config.cta.whatsapp}</Button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-white/15 bg-brand py-4" aria-hidden>
        <div className="marquee flex w-max">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 items-center">
              {marquee.map((m) => (
                <span key={m + n} className="flex items-center font-display text-3xl uppercase md:text-4xl">
                  <span className="px-6">{m}</span>
                  <svg className="h-5 w-5" viewBox="0 0 16 16"><path d="M2 8h10M8 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" /></svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* DEMOS */}
      <section id="demos" className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <Title outline="o seu nicho">Escolha</Title>
          <p className="mt-6 max-w-md text-white/70">Toque em uma demo e navegue. Tudo funciona, só não é o seu site ainda.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {demos.map((d, i) => (
            <Reveal key={d.id} delay={(i % 2) * 90} className={d.span}>
              <Link
                to={`/demo/${d.id}`}
                className={`group flex h-full flex-col border border-white/15 transition hover:border-brand ${d.span === "md:col-span-6" ? "md:flex-row" : ""}`}
              >
                <div className={d.span === "md:col-span-6" ? "md:w-1/2" : ""}>
                  <Preview d={d} />
                </div>
                <div className={`flex flex-1 flex-col justify-between gap-6 p-6 ${d.span === "md:col-span-6" ? "md:p-10" : ""}`}>
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {d.tags.map((t) => (
                        <span key={t} className="border border-white/25 px-2.5 py-1 text-xs text-white/70">{t}</span>
                      ))}
                      {!d.ready && <span className="bg-white px-2.5 py-1 text-xs font-bold text-black">Em breve</span>}
                    </div>
                    <h3 className="font-display text-4xl uppercase leading-none transition group-hover:text-brand md:text-5xl">{d.name}</h3>
                    <p className="mt-3 text-white/70">{d.text}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-bold">
                    Ver demo <ArrowUpRight size={18} className="text-brand transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como" className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <Reveal><Title outline="funciona">Como</Title></Reveal>
          <ol className="mt-12 grid gap-px bg-white/15 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="bg-black">
                <Reveal delay={i * 120} className="p-8">
                  <span className="text-outline font-display text-8xl leading-none">{i + 1}</span>
                  <h3 className="mt-6 font-display text-3xl uppercase">{t}</h3>
                  <p className="mt-3 text-white/70">{d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal>
            <h3 className="mt-20 font-display text-3xl uppercase">Tudo isso incluído</h3>
            <ul className="mt-6 grid gap-px bg-white/15 sm:grid-cols-2 md:grid-cols-4">
              {included.map((x) => (
                <li key={x} className="flex items-center gap-3 bg-black p-5 text-sm font-medium">
                  <Check size={18} className="shrink-0 text-brand" />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PREÇOS */}
      <section id="precos" className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <Reveal><Title outline="claros">Preços</Title></Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3 md:items-stretch">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 100} className="h-full">
                <div className={`flex h-full flex-col justify-between gap-10 p-8 ${p.hot ? "bg-brand" : "border border-white/15"}`}>
                  <div>
                    <h3 className="font-display text-3xl uppercase">{p.name}</h3>
                    <p className={`mt-3 ${p.hot ? "text-white" : "text-white/70"}`}>{p.text}</p>
                  </div>
                  <div>
                    <p className="text-sm">a partir de</p>
                    <p className="font-display text-6xl">R$ {p.price}</p>
                    <a
                      href={wa(`Oi! Tenho interesse no plano ${p.name}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-6 inline-block px-6 py-3 text-sm font-bold uppercase transition ${
                        p.hot ? "bg-black hover:bg-white hover:text-black" : "border-2 border-white hover:bg-white hover:text-black"
                      }`}
                    >
                      Quero este plano
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/15">
        <div className="mx-auto max-w-4xl px-5 py-24">
          <Reveal><Title outline="frequentes">Perguntas</Title></Reveal>
          <div className="mt-12 border-t border-white/15">
            {faq.map(([q, a], i) => {
              const isOpen = faqOpen === i;
              return (
                <div key={q} className="border-b border-white/15">
                  <button
                    className="flex w-full items-center justify-between gap-4 py-6 text-left font-display text-2xl uppercase transition hover:text-brand md:text-3xl"
                    aria-expanded={isOpen}
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                  >
                    {q}
                    <Plus className={`shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                  {isOpen && <p className="pop max-w-2xl pb-6 text-white/70">{a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" className="overflow-hidden border-t border-white/15 bg-brand">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center md:py-32">
          <Reveal>
            <h2 className="font-display text-[clamp(3.2rem,12vw,10rem)] uppercase leading-[0.95]">
              Pronto para
              <br />
              <span className="text-outline">avançar?</span>
            </h2>
            <a
              href={wa()}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block bg-black px-9 py-5 text-sm font-bold uppercase tracking-wide transition hover:bg-white hover:text-black"
            >
              {config.cta.whatsapp}
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/15 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-white/60 md:flex-row">
          <Logo className="text-2xl text-white" />
          <div className="flex gap-6">
            <a href={config.instagram} className="transition hover:text-white">Instagram</a>
            <a href={`mailto:${config.email}`} className="transition hover:text-white">{config.email}</a>
          </div>
          <p>© {new Date().getFullYear()} {config.company}</p>
        </div>
      </footer>
    </main>
  );
}
