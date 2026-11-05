import { useState, type FormEvent } from "react";
import { Scale, Briefcase, Users, Building2, Landmark, Check, Clock, Phone, MapPin } from "lucide-react";
import DemoShell from "../components/DemoShell";
import { Wrap, Section, Heading, DemoNav, DemoFooter, Pic, Accordion, type Theme } from "../components/demoKit";

/*
  Tom desta demo: informativo e discreto, conforme as regras de publicidade da OAB
  (sem promessa de resultado, sem captação, sem valores de honorários).
  Antes de usar com um cliente real, o escritório deve conferir o texto com o próprio advogado responsável.
*/

const themes: Record<string, Theme> = {
  Clássico: {
    "--bg": "#f7f4ec", "--surface": "#ece6d6", "--ink": "#14213d", "--muted": "#5a6275", "--line": "rgba(20,33,61,.2)",
    "--accent": "#c9a24b", "--onaccent": "#0f1a33", "--inv": "#0f1a33", "--inv-ink": "#f2ede0",
    "--r": "2px", "--r-btn": "2px", "--display": '"Playfair Display", serif', "--dw": "700", "--body": '"Inter", sans-serif',
  },
  Moderna: {
    "--bg": "#ffffff", "--surface": "#f3f4f6", "--ink": "#111827", "--muted": "#4b5563", "--line": "rgba(17,24,39,.14)",
    "--accent": "#1e3a8a", "--onaccent": "#ffffff", "--inv": "#eef1f7", "--inv-ink": "#111827",
    "--r": "10px", "--r-btn": "10px", "--display": '"DM Sans", sans-serif', "--dw": "700", "--body": '"Inter", sans-serif',
  },
};

const areas = [
  { id: "Civil", icon: <Scale />, text: "Contratos, responsabilidade civil, direito do consumidor e questões imobiliárias." },
  { id: "Trabalhista", icon: <Briefcase />, text: "Orientação a trabalhadores e empresas sobre relações de trabalho e rescisões." },
  { id: "Família", icon: <Users />, text: "Divórcio, guarda, pensão alimentícia, inventários e planejamento sucessório." },
  { id: "Empresarial", icon: <Building2 />, text: "Constituição de sociedades, contratos empresariais e consultoria preventiva." },
  { id: "Previdenciário", icon: <Landmark />, text: "Análise de contribuições, benefícios e aposentadorias junto ao INSS." },
];
const partners = [
  { name: "Helena Moura", oab: "OAB/SP nº 123.456", text: "Atua em Direito de Família e Sucessões. Pós-graduada em Direito Processual Civil." },
  { name: "Ricardo Almeida", oab: "OAB/SP nº 234.567", text: "Atua em Direito Empresarial e Civil. Pós-graduado em Direito Contratual." },
];
const articles = [
  { cat: "Civil", title: "O que observar antes de assinar um contrato de aluguel", time: "5 min", text: "Prazos, reajuste, garantias e responsabilidades de cada parte." },
  { cat: "Trabalhista", title: "Banco de horas: pontos de atenção para empresas e empregados", time: "4 min", text: "Como a compensação deve ser formalizada e registrada." },
  { cat: "Família", title: "Guarda compartilhada: o que a lei prevê", time: "6 min", text: "Conceitos básicos e o foco no interesse da criança." },
  { cat: "Empresarial", title: "Contrato social: cláusulas que merecem atenção", time: "5 min", text: "Retirada de sócio, quotas e deliberações." },
  { cat: "Previdenciário", title: "Tempo de contribuição: entenda os conceitos", time: "6 min", text: "Diferença entre tempo de contribuição, carência e idade mínima." },
  { cat: "Família", title: "Inventário extrajudicial: quando é possível", time: "4 min", text: "Requisitos gerais para fazer em cartório." },
];
const faq: [string, string][] = [
  ["Como é o primeiro atendimento?", "Você envia uma mensagem e o escritório entra em contato para agendar uma conversa, presencial ou por videochamada."],
  ["Quais documentos devo reunir?", "Contratos, comunicações, comprovantes e qualquer documento relacionado ao assunto ajudam na análise inicial."],
  ["O escritório atende online?", "Sim, por videochamada, quando o caso permitir."],
  ["Há garantia de resultado?", "Não. A advocacia é uma atividade de meio: cada caso é analisado individualmente e nenhum resultado pode ser prometido."],
  ["Meus dados ficam protegidos?", "As informações enviadas são tratadas com sigilo profissional e de acordo com a LGPD."],
];

export default function Advocacia() {
  const [cat, setCat] = useState("Todas");
  const [form, setForm] = useState({ name: "", email: "", area: "", msg: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (form.name.trim().length < 3) x.name = "Informe seu nome completo.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) x.email = "Informe um e-mail válido.";
    if (!form.area) x.area = "Escolha a área do assunto.";
    if (form.msg.trim().length < 10) x.msg = "Descreva brevemente o assunto (mínimo de 10 caracteres).";
    setErr(x);
    if (!Object.keys(x).length) setSent(true);
  };
  const shown = articles.filter((a) => cat === "Todas" || a.cat === cat);

  return (
    <DemoShell niche="advocacia" variants={["Clássico", "Moderna"]}>
      {(v) => (
        <Wrap theme={themes[v]}>
          <DemoNav brand="Moura & Almeida" ctaHref="#contato" cta="Contato"
            links={[["Áreas", "#areas"], ["Escritório", "#escritorio"], ["Artigos", "#artigos"], ["Dúvidas", "#duvidas"]]} />

          <Section inv>
            <div className="max-w-3xl py-6 md:py-12">
              <div className="mb-8 h-px w-16" style={{ background: "var(--accent)" }} />
              <h1 className="d-display text-5xl leading-[1.05] md:text-7xl">Advocacia com método e discrição.</h1>
              <p className="mt-6 max-w-xl text-lg opacity-80">Atuamos em causas cíveis, trabalhistas, de família, empresariais e previdenciárias, com atendimento individual e acompanhamento claro de cada etapa.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#contato" className="btn-d">Entrar em contato</a>
                <a href="#areas" className="btn-d btn-d-ghost" style={{ color: "inherit" }}>Áreas de atuação</a>
              </div>
            </div>
          </Section>

          <Section id="areas">
            <Heading title="Áreas de atuação" />
            <div className="border-d-t">
              {areas.map((a) => (
                <div key={a.id} className="border-d-b grid gap-3 py-6 md:grid-cols-[auto_12rem_1fr] md:items-center md:gap-8">
                  <span className="hidden md:block">{a.icon}</span>
                  <h3 className="d-display text-2xl">{a.id}</h3>
                  <p className="text-d-muted">{a.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="escritorio" alt>
            <Heading title="O escritório" sub="Fundado em 2012, em São Paulo, com atuação consultiva e contenciosa." />
            <div className="grid gap-8 md:grid-cols-2">
              {partners.map((p, i) => (
                <article key={p.name} className="grid grid-cols-[7rem_1fr] gap-5">
                  <Pic i={i} label={`Foto de ${p.name}`} icon={<Scale size={28} />} className="r-d aspect-[3/4] w-full" />
                  <div>
                    <h3 className="d-display text-2xl">{p.name}</h3>
                    <p className="text-d-muted text-sm">{p.oab}</p>
                    <p className="mt-3 text-sm">{p.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="artigos">
            <Heading title="Artigos" sub="Conteúdo informativo. Não substitui a análise de um caso concreto." />
            <div className="mb-6 flex flex-wrap gap-2">
              {["Todas", ...areas.map((a) => a.id)].map((c) => <button key={c} className="chip-d text-sm" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
            </div>
            <div key={cat} className="pop grid gap-4 md:grid-cols-3">
              {shown.map((a) => (
                <article key={a.title} className="border-d r-d flex flex-col justify-between gap-6 p-6">
                  <div>
                    <p className="text-d-muted text-xs">{a.cat} · {a.time} de leitura</p>
                    <h3 className="d-display mt-3 text-xl leading-snug">{a.title}</h3>
                    <p className="text-d-muted mt-2 text-sm">{a.text}</p>
                  </div>
                  <span className="text-sm font-semibold underline underline-offset-4">Ler artigo</span>
                </article>
              ))}
            </div>
          </Section>

          <Section id="duvidas" alt>
            <Heading title="Dúvidas frequentes" />
            <div className="max-w-3xl"><Accordion items={faq} /></div>
          </Section>

          <Section id="contato">
            <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 className="d-display text-4xl md:text-5xl">Contato</h2>
                <p className="text-d-muted mt-3">Descreva brevemente o assunto. O escritório responde em dias úteis.</p>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex gap-3"><MapPin size={18} className="shrink-0" />Av. Paulista, 1500, conj. 82 — Bela Vista, São Paulo/SP</li>
                  <li className="flex gap-3"><Phone size={18} className="shrink-0" />(11) 3000-0000</li>
                  <li className="flex gap-3"><Clock size={18} className="shrink-0" />Segunda a sexta, 9h às 18h</li>
                </ul>
              </div>
              {sent ? (
                <div role="status" className="pop border-d-accent r-d flex flex-col items-center justify-center gap-3 border p-10 text-center">
                  <span className="bg-d-accent text-d-onaccent grid h-14 w-14 place-items-center rounded-full"><Check /></span>
                  <h3 className="d-display text-2xl">Mensagem recebida</h3>
                  <p className="text-d-muted">Obrigado, {form.name.split(" ")[0]}. O escritório retornará em breve pelo e-mail informado.</p>
                  <button className="btn-d btn-d-ghost mt-2" onClick={() => { setSent(false); setForm({ name: "", email: "", area: "", msg: "" }); }}>Enviar outra mensagem</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-4">
                  {([["name", "Nome completo", "text"], ["email", "E-mail", "email"]] as const).map(([k, l, t]) => (
                    <label key={k} className="block text-sm">
                      <span className="text-d-muted mb-1.5 block">{l}</span>
                      <input className="field-d" type={t} value={form[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!err[k]} />
                      {err[k] && <span role="alert" className="mt-1 block text-red-600">{err[k]}</span>}
                    </label>
                  ))}
                  <label className="block text-sm">
                    <span className="text-d-muted mb-1.5 block">Área do assunto</span>
                    <select className="field-d" value={form.area} onChange={(e) => set("area", e.target.value)} aria-invalid={!!err.area}>
                      <option value="">Selecione</option>
                      {areas.map((a) => <option key={a.id}>{a.id}</option>)}
                    </select>
                    {err.area && <span role="alert" className="mt-1 block text-red-600">{err.area}</span>}
                  </label>
                  <label className="block text-sm">
                    <span className="text-d-muted mb-1.5 block">Mensagem</span>
                    <textarea rows={4} className="field-d" value={form.msg} onChange={(e) => set("msg", e.target.value)} aria-invalid={!!err.msg} />
                    {err.msg && <span role="alert" className="mt-1 block text-red-600">{err.msg}</span>}
                  </label>
                  <button type="submit" className="btn-d">Enviar mensagem</button>
                </form>
              )}
            </div>
          </Section>

          <DemoFooter>
            <p>Moura & Almeida Advogados Associados (nome fictício, demonstração). Sociedade de advogados inscrita na OAB/SP.</p>
            <p>Este site tem caráter exclusivamente informativo, em conformidade com as normas de publicidade da advocacia da OAB. Não constitui oferta de serviços, aconselhamento jurídico nem promessa de resultado.</p>
          </DemoFooter>
        </Wrap>
      )}
    </DemoShell>
  );
}
