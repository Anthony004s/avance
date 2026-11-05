import { useState } from "react";
import { Smile, Stethoscope, Sparkles, ShieldCheck, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import DemoShell from "../components/DemoShell";
import { Wrap, Section, Heading, DemoNav, DemoFooter, Pic, Accordion, Info, Wizard, type Theme } from "../components/demoKit";

/*
  Tom desta demo: acolhedor e informativo, conforme as normas de publicidade dos conselhos de saúde
  (sem promessa de resultado, sem antes/depois de pacientes, sem sensacionalismo).
  Confira o texto final com o responsável técnico da clínica.
*/

const themes: Record<string, Theme> = {
  Turquesa: {
    "--bg": "#ffffff", "--surface": "#eef8f7", "--ink": "#0e3a3a", "--muted": "#4d6b6a", "--line": "rgba(14,58,58,.16)",
    "--accent": "#0a7f7a", "--onaccent": "#ffffff", "--r": "18px", "--r-btn": "999px",
    "--display": '"Nunito", sans-serif', "--dw": "800", "--body": '"Nunito", sans-serif',
  },
  "Bem-estar": {
    "--bg": "#f6f1e7", "--surface": "#ebe4d3", "--ink": "#243529", "--muted": "#5d6b5f", "--line": "rgba(36,53,41,.18)",
    "--accent": "#4a7456", "--onaccent": "#ffffff", "--r": "22px", "--r-btn": "999px",
    "--display": '"Nunito", sans-serif', "--dw": "800", "--body": '"Nunito", sans-serif',
  },
};

const specialties = [
  { name: "Clínica geral", icon: <Stethoscope />, text: "Avaliação completa, prevenção, limpeza e tratamento de cáries." },
  { name: "Ortodontia", icon: <Smile />, text: "Acompanhamento do alinhamento dos dentes com planejamento individual." },
  { name: "Implantes", icon: <ShieldCheck />, text: "Reabilitação oral indicada após avaliação clínica e exames." },
  { name: "Clareamento", icon: <Sparkles />, text: "Indicado conforme a avaliação do profissional, com acompanhamento." },
];
const team = [
  { name: "Dra. Marina Duarte", role: "Clínica geral e responsável técnica", cro: "CRO-SP 00000" },
  { name: "Dr. Paulo Nogueira", role: "Ortodontia", cro: "CRO-SP 00001" },
  { name: "Dra. Aline Castro", role: "Implantodontia", cro: "CRO-SP 00002" },
];
const tour = ["Recepção", "Sala de atendimento", "Sala de esterilização", "Espaço infantil"];
const plans = ["Amparo Saúde", "VidaPlena", "Prime Dental", "Sorriso Mais", "OdontoVale"]; // nomes fictícios
const quotes = [
  { name: "Renata P.", text: "Fui muito bem acolhida. Explicaram cada etapa com calma e tiraram todas as minhas dúvidas." },
  { name: "Marcos A.", text: "Ambiente tranquilo e equipe atenciosa. Minha filha perdeu o medo de ir ao dentista." },
];
const faq: [string, string][] = [
  ["Como funciona a primeira consulta?", "Fazemos uma avaliação clínica, conversamos sobre suas necessidades e explicamos as opções indicadas para o seu caso."],
  ["Vocês atendem crianças?", "Sim. Temos um espaço pensado para o atendimento infantil, com paciência e linguagem adequada."],
  ["Quais convênios são aceitos?", "Trabalhamos com diversos convênios. A recepção confirma a cobertura do seu plano antes da consulta."],
  ["Preciso levar exames?", "Se você já tem radiografias ou exames recentes, traga. Se não tiver, o profissional avalia se são necessários."],
  ["Como cancelo ou remarco?", "Avise pela recepção com pelo menos 24 horas de antecedência para liberarmos o horário a outro paciente."],
];

function Tour() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + tour.length) % tour.length);
  return (
    <div>
      <div className="relative">
        <Pic key={i} i={i} label={tour[i]} icon={<Heart size={64} />} className="pop r-d aspect-[16/9] w-full" />
        <button aria-label="Anterior" onClick={() => go(-1)} className="btn-d btn-d-ghost absolute left-3 top-1/2 -translate-y-1/2" style={{ background: "var(--bg)", padding: ".6rem" }}><ChevronLeft size={18} /></button>
        <button aria-label="Próxima" onClick={() => go(1)} className="btn-d btn-d-ghost absolute right-3 top-1/2 -translate-y-1/2" style={{ background: "var(--bg)", padding: ".6rem" }}><ChevronRight size={18} /></button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-semibold" aria-live="polite">{tour[i]}</p>
        <div className="flex gap-2">
          {tour.map((t, k) => (
            <button key={t} aria-label={`Ver ${t}`} aria-current={k === i} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "bg-d-accent w-8" : "bg-d-line w-2.5"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Clinica() {
  return (
    <DemoShell niche="clínica" variants={["Turquesa", "Bem-estar"]}>
      {(v) => (
        <Wrap theme={themes[v]}>
          <DemoNav brand="Clínica Vitale" ctaHref="#agendar" cta="Agendar consulta"
            links={[["Especialidades", "#especialidades"], ["Equipe", "#equipe"], ["Estrutura", "#estrutura"], ["Dúvidas", "#duvidas"]]} />

          <Section>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="d-display text-5xl leading-[1.05] md:text-7xl">Cuidar do seu sorriso começa com uma boa conversa.</h1>
                <p className="text-d-muted mt-5 max-w-md text-lg">Atendimento odontológico para toda a família, com calma, explicações claras e profissionais atentos a cada paciente.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#agendar" className="btn-d">Agendar consulta</a>
                  <a href="#especialidades" className="btn-d btn-d-ghost">Conhecer especialidades</a>
                </div>
              </div>
              <Pic i={0} label="Foto da recepção" icon={<Smile size={72} />} className="aspect-[4/5] w-full rounded-[var(--r)] md:rounded-tl-[6rem]" />
            </div>
          </Section>

          <Section id="especialidades" alt>
            <Heading title="Especialidades" sub="Cada tratamento começa com uma avaliação individual." />
            <div className="grid gap-4 sm:grid-cols-2">
              {specialties.map((s) => (
                <article key={s.name} className="r-d flex gap-5 p-6" style={{ background: "var(--bg)" }}>
                  <span className="bg-d-accent text-d-onaccent grid h-12 w-12 shrink-0 place-items-center rounded-full">{s.icon}</span>
                  <div>
                    <h3 className="d-display text-2xl">{s.name}</h3>
                    <p className="text-d-muted mt-1">{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="equipe">
            <Heading title="Nossa equipe" />
            <div className="grid gap-5 sm:grid-cols-3">
              {team.map((t, i) => (
                <article key={t.name}>
                  <Pic i={i + 1} label={`Foto de ${t.name}`} icon={<Smile size={40} />} className="r-d aspect-[4/5] w-full" />
                  <h3 className="d-display mt-4 text-xl">{t.name}</h3>
                  <p className="text-d-muted text-sm">{t.role}</p>
                  <p className="text-d-muted text-sm">{t.cro}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section id="estrutura" alt>
            <Heading title="Conheça a clínica" sub="Um espaço pensado para você se sentir à vontade." />
            <Tour />
          </Section>

          <Section>
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="d-display text-4xl">Convênios</h2>
                <p className="text-d-muted mt-3">Trabalhamos com os principais planos odontológicos. A recepção confirma a cobertura antes da sua consulta.</p>
                <ul className="mt-6 flex flex-wrap gap-2">{plans.map((p) => <li key={p} className="border-d rounded-full px-4 py-2 text-sm">{p}</li>)}</ul>
              </div>
              <div>
                <h2 className="d-display text-4xl">Pacientes comentam</h2>
                <div className="mt-6 space-y-4">
                  {quotes.map((q) => (
                    <figure key={q.name} className="border-d r-d p-5">
                      <blockquote>“{q.text}”</blockquote>
                      <figcaption className="text-d-muted mt-2 text-sm">{q.name}</figcaption>
                    </figure>
                  ))}
                  <p className="text-d-muted text-xs">Relatos individuais sobre o atendimento. Cada caso exige avaliação profissional e os resultados variam.</p>
                </div>
              </div>
            </div>
          </Section>

          <Section id="duvidas" alt>
            <Heading title="Perguntas frequentes" />
            <div className="max-w-3xl"><Accordion items={faq} /></div>
          </Section>

          <Section id="agendar">
            <Heading title="Agende sua consulta" sub="Escolha a especialidade e o horário. A clínica confirma com você." />
            <div className="max-w-2xl">
              <Wizard
                doneTitle="Solicitação enviada!"
                doneText="A clínica confirmaria o horário com você pelo WhatsApp."
                summary={(a) => [["Especialidade", a.spec], ["Quando", `${a.when_day} às ${a.when_slot}`], ["Paciente", a.name], ["Telefone", a.phone]]}
                steps={[
                  { key: "spec", title: "Qual especialidade?", type: "choice", options: specialties.map((s) => ({ value: s.name, label: s.name })) },
                  { key: "when", title: "Melhor dia e horário", type: "when", slots: ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"] },
                  { key: "me", title: "Seus dados", type: "form", fields: [
                    { key: "name", label: "Nome completo", placeholder: "Seu nome" },
                    { key: "phone", label: "WhatsApp", type: "tel", placeholder: "(11) 90000-0000" },
                  ] },
                ]}
              />
            </div>
          </Section>

          <Section alt>
            <Heading title="Como chegar" />
            <Info address="Rua Oscar Freire, 1200, 3º andar — Jardins, São Paulo/SP" hours={[["Segunda a sexta", "8h às 19h"], ["Sábado", "8h às 13h"], ["Domingo", "Fechado"]]} />
          </Section>

          <DemoFooter>
            <p>Clínica Vitale (nome fictício, demonstração). Responsável técnica: Dra. Marina Duarte — CRO-SP 00000.</p>
            <p>As informações deste site têm caráter educativo e não substituem a avaliação de um cirurgião-dentista. Cada caso exige diagnóstico individual.</p>
          </DemoFooter>
        </Wrap>
      )}
    </DemoShell>
  );
}
