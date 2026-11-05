import { useState } from "react";
import { Sparkles, Scissors, Brush, Flower2, Gem } from "lucide-react";
import DemoShell from "../components/DemoShell";
import { Wrap, Section, Heading, DemoNav, DemoFooter, Pic, Quotes, Info, Gallery, Wizard, type Theme } from "../components/demoKit";

const themes: Record<string, Theme> = {
  Nude: {
    "--bg": "#f7f0ea", "--surface": "#efe3d9", "--ink": "#3a2a28", "--muted": "#7a6660", "--line": "rgba(58,42,40,.18)",
    "--accent": "#a8605a", "--onaccent": "#ffffff", "--r": "6px", "--r-btn": "999px",
    "--display": '"Cormorant Garamond", serif', "--dw": "600", "--body": '"DM Sans", sans-serif',
  },
  Noir: {
    "--bg": "#0f0c0b", "--surface": "#1a1412", "--ink": "#f3e8df", "--muted": "#b3a196", "--line": "rgba(243,232,223,.16)",
    "--accent": "#d9a88c", "--onaccent": "#1a1412", "--r": "6px", "--r-btn": "999px",
    "--display": '"Cormorant Garamond", serif', "--dw": "600", "--body": '"DM Sans", sans-serif',
  },
};

// Para usar fotos reais no antes/depois, coloque aqui o caminho das imagens (ex.: "/fotos/antes.jpg").
const BEFORE_SRC = "";
const AFTER_SRC = "";

const services: Record<string, [string, number][]> = {
  Cabelo: [["Corte", 120], ["Escova", 70], ["Hidratação", 110], ["Coloração", 220], ["Mechas", 480]],
  Unhas: [["Manicure", 45], ["Pedicure", 55], ["Esmaltação em gel", 90], ["Alongamento", 180]],
  Maquiagem: [["Maquiagem social", 160], ["Maquiagem para festa", 190], ["Design de sobrancelha", 60]],
  Estética: [["Limpeza de pele", 150], ["Massagem relaxante", 140], ["Drenagem linfática", 130], ["Depilação a cera (pernas)", 80]],
};
const cats = Object.keys(services);
const pros = [
  { name: "Camila", role: "Cabelos e colorimetria", icon: <Scissors size={40} /> },
  { name: "Juliana", role: "Nail designer", icon: <Gem size={40} /> },
  { name: "Renata", role: "Maquiagem e estética", icon: <Brush size={40} /> },
];
const packs = [
  { name: "Mãos & pés", price: 85, items: ["Manicure", "Pedicure", "Esmaltação comum"] },
  { name: "Dia de cuidado", price: 380, items: ["Corte e escova", "Hidratação", "Manicure"], hot: true },
  { name: "Dia da noiva", price: 950, items: ["Penteado", "Maquiagem", "Manicure e pedicure"] },
];
const gIco = <Sparkles size={36} />;
const gallery = [
  { cat: "Cabelo", label: "Loiro iluminado", icon: gIco }, { cat: "Cabelo", label: "Corte long bob", icon: gIco },
  { cat: "Cabelo", label: "Ondas naturais", icon: gIco }, { cat: "Unhas", label: "Nude translúcido", icon: gIco },
  { cat: "Unhas", label: "Francesinha", icon: gIco }, { cat: "Maquiagem", label: "Make de festa", icon: gIco },
  { cat: "Maquiagem", label: "Pele iluminada", icon: gIco }, { cat: "Unhas", label: "Gel rosé", icon: gIco },
];
const quotes = [
  { name: "Carolina R.", text: "Ambiente lindo e atendimento que faz a gente se sentir em casa. A Camila entende o que eu quero." },
  { name: "Fernanda L.", text: "Agendei pelo site e fui atendida no horário. Saí de lá renovada." },
  { name: "Beatriz T.", text: "Fiz o dia da noiva aqui e foi tudo tranquilo, do penteado à maquiagem." },
];

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const look = "absolute inset-0 grid place-items-center";
  return (
    <div>
      <div className="r-d relative aspect-[4/3] select-none overflow-hidden md:aspect-[16/8]">
        {/* depois */}
        {AFTER_SRC ? <img src={AFTER_SRC} alt="Depois" className="absolute inset-0 h-full w-full object-cover" /> : (
          <div className={look} style={{ background: "linear-gradient(135deg, var(--accent), #f2d6c4)" }}><Sparkles size={64} className="opacity-50" style={{ color: "#fff" }} /></div>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Depois</span>
        {/* antes (recortado pela posição do controle) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {BEFORE_SRC ? <img src={BEFORE_SRC} alt="Antes" className="absolute inset-0 h-full w-full object-cover" /> : (
            <div className={look} style={{ background: "linear-gradient(135deg, #6f6560, #968a84)" }}><Sparkles size={64} className="opacity-30" style={{ color: "#fff" }} /></div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Antes</span>
        </div>
        {/* controle */}
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-black shadow-lg">⇄</span>
        </div>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
      </div>
      <p className="text-d-muted mt-3 text-sm">Arraste para comparar. Aqui entram as fotos reais do salão, com autorização das clientes.</p>
    </div>
  );
}

export default function Salao() {
  const [tab, setTab] = useState(cats[0]);
  return (
    <DemoShell niche="salão de beleza" variants={["Nude", "Noir"]}>
      {(v) => (
        <Wrap theme={themes[v]}>
          <DemoNav brand="Studio Lumière" ctaHref="#agendar" cta="Agendar"
            links={[["Serviços", "#servicos"], ["Transformações", "#antes-depois"], ["Equipe", "#equipe"], ["Pacotes", "#pacotes"]]} />

          <Section>
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
              <div>
                <h1 className="d-display text-6xl leading-[0.95] md:text-8xl">Beleza com tempo para você.</h1>
                <p className="text-d-muted mt-5 max-w-md text-lg">Cabelo, unhas, maquiagem e estética em um espaço acolhedor nos Jardins. Atendimento com hora marcada.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#agendar" className="btn-d">Agendar horário</a>
                  <a href="#servicos" className="btn-d btn-d-ghost">Ver serviços</a>
                </div>
              </div>
              <Pic i={2} label="Imagem editorial do salão" icon={<Flower2 size={72} />} className="aspect-[3/4] w-full rounded-t-full" />
            </div>
          </Section>

          <Section id="servicos" alt>
            <Heading title="Serviços" sub="Escolha a categoria. Valores a partir de, conforme o comprimento e a técnica." />
            <div className="mb-6 flex flex-wrap gap-2">
              {cats.map((c) => <button key={c} className="chip-d" aria-pressed={tab === c} onClick={() => setTab(c)}>{c}</button>)}
            </div>
            <ul key={tab} className="pop border-d-t">
              {services[tab].map(([n, p]) => (
                <li key={n} className="border-d-b flex items-baseline justify-between gap-4 py-4">
                  <span className="d-display text-2xl">{n}</span>
                  <span className="text-d-muted">a partir de <strong className="text-lg" style={{ color: "var(--ink)" }}>R$ {p}</strong></span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="antes-depois">
            <Heading title="Transformações" />
            <BeforeAfter />
          </Section>

          <Section id="equipe" alt>
            <Heading title="Equipe" />
            <div className="grid gap-5 sm:grid-cols-3">
              {pros.map((p, i) => (
                <article key={p.name}>
                  <Pic i={i} label={`Foto de ${p.name}`} icon={p.icon} className="aspect-[3/4] w-full rounded-t-full" />
                  <h3 className="d-display mt-4 text-3xl">{p.name}</h3>
                  <p className="text-d-muted text-sm">{p.role}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section>
            <Heading title="Galeria" />
            <Gallery items={gallery} cats={["Cabelo", "Unhas", "Maquiagem"]} />
          </Section>

          <Section id="pacotes" alt>
            <Heading title="Pacotes" sub="Combinações pensadas para ocasiões especiais." />
            <div className="grid gap-4 md:grid-cols-3">
              {packs.map((p) => (
                <article key={p.name} className={`r-d flex flex-col justify-between gap-8 p-7 ${p.hot ? "bg-d-accent text-d-onaccent" : "border-d"}`}>
                  <div>
                    <h3 className="d-display text-3xl">{p.name}</h3>
                    <ul className="mt-4 space-y-1.5 text-sm">{p.items.map((i) => <li key={i}>· {i}</li>)}</ul>
                  </div>
                  <div>
                    <p className="d-display text-4xl">R$ {p.price}</p>
                    <a href="#agendar" className={`btn-d mt-4 ${p.hot ? "" : "btn-d-ghost"}`} style={p.hot ? { background: "var(--bg)", color: "var(--ink)" } : undefined}>Agendar</a>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="agendar">
            <Heading title="Agende seu horário" sub="Três passos. Horários riscados já estão ocupados." />
            <div className="max-w-2xl">
              <Wizard
                doneTitle="Horário reservado!"
                doneText="Você receberia a confirmação e um lembrete no dia anterior."
                summary={(a) => [["Serviço", a.service], ["Profissional", a.pro], ["Quando", `${a.when_day} às ${a.when_slot}`]]}
                steps={[
                  { key: "service", title: "O que você quer fazer?", type: "choice",
                    options: cats.flatMap((c) => services[c].map(([n, p]) => ({ value: n, label: n, sub: `a partir de R$ ${p}`, group: c }))) },
                  { key: "pro", title: "Com quem?", type: "choice", options: [{ value: "Sem preferência", label: "Sem preferência" }, ...pros.map((p) => ({ value: p.name, label: p.name, sub: p.role }))] },
                  { key: "when", title: "Qual dia e horário?", type: "when", slots: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"] },
                ]}
              />
            </div>
          </Section>

          <Section alt>
            <Heading title="Quem já veio" />
            <Quotes items={quotes} stars />
          </Section>

          <Section>
            <Heading title="Onde estamos" />
            <Info address="Alameda Lorena, 450 — Jardins, São Paulo/SP" hours={[["Terça a sexta", "9h às 20h"], ["Sábado", "9h às 18h"], ["Domingo e segunda", "Fechado"]]} />
          </Section>

          <DemoFooter><p>© Studio Lumière (nome fictício, demonstração).</p></DemoFooter>
        </Wrap>
      )}
    </DemoShell>
  );
}
