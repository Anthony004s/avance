import { Scissors, Flame, Sparkles, Crown } from "lucide-react";
import DemoShell from "../components/DemoShell";
import { Wrap, Section, Heading, DemoNav, DemoFooter, Pic, Quotes, Info, Gallery, Wizard, type Theme } from "../components/demoKit";
import { wa } from "../config";

const themes: Record<string, Theme> = {
  Moderno: {
    "--bg": "#0d0c0a", "--surface": "#171512", "--ink": "#f5f3ee", "--muted": "#a8a29a", "--line": "rgba(255,255,255,.14)",
    "--accent": "#fbbf24", "--onaccent": "#111111", "--r": "6px", "--r-btn": "6px",
    "--display": '"Oswald", sans-serif', "--dw": "500", "--body": '"Inter", sans-serif',
  },
  Vintage: {
    "--bg": "#f3ead8", "--surface": "#e9dcc2", "--ink": "#2b1d12", "--muted": "#6b5a48", "--line": "rgba(43,29,18,.25)",
    "--accent": "#8a2f12", "--onaccent": "#f3ead8", "--r": "2px", "--r-btn": "2px",
    "--display": '"Playfair Display", serif', "--dw": "700", "--body": '"Inter", sans-serif',
  },
};

const services = [
  { name: "Corte", price: 55, min: 40, text: "Tesoura ou máquina, finalizado com pomada." },
  { name: "Barba", price: 45, min: 30, text: "Toalha quente, navalha e hidratação." },
  { name: "Combo corte + barba", price: 90, min: 70, text: "O pacote mais pedido da casa." },
  { name: "Pigmentação", price: 70, min: 45, text: "Disfarça falhas e realça o desenho." },
  { name: "Sobrancelha", price: 20, min: 15, text: "Alinhamento na navalha." },
];
const barbers = [
  { name: "Rafael", role: "Degradê e navalhado", icon: <Scissors size={44} /> },
  { name: "Diego", role: "Barba e toalha quente", icon: <Flame size={44} /> },
  { name: "Thiago", role: "Cortes clássicos", icon: <Crown size={44} /> },
];
const ico = <Scissors size={40} />;
const gallery = [
  { cat: "Degradê", label: "Degradê baixo", icon: ico }, { cat: "Degradê", label: "Degradê alto", icon: ico },
  { cat: "Social", label: "Corte social", icon: ico }, { cat: "Social", label: "Risca lateral", icon: ico },
  { cat: "Barba", label: "Barba cheia", icon: ico }, { cat: "Barba", label: "Barba desenhada", icon: ico },
  { cat: "Navalhado", label: "Navalhado clássico", icon: ico }, { cat: "Navalhado", label: "Pezinho marcado", icon: ico },
];
const quotes = [
  { name: "Lucas M.", text: "Cheguei no horário e saí no horário. Corte exatamente como pedi." },
  { name: "André S.", text: "Agendei pelo site em 30 segundos. Nunca mais precisei mandar mensagem." },
  { name: "Pedro H.", text: "Ambiente muito bom, barba impecável e a cerveja gelada ajuda." },
];

export default function Barbearia() {
  return (
    <DemoShell niche="barbearia" variants={["Moderno", "Vintage"]}>
      {(v) => (
        <Wrap theme={themes[v]}>
          <DemoNav brand="Black Rock" ctaHref="#agendar" cta="Agendar"
            links={[["Serviços", "#servicos"], ["Equipe", "#equipe"], ["Galeria", "#galeria"], ["Contato", "#contato"]]} />

          <Section>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="d-display text-6xl uppercase leading-[0.95] md:text-8xl">Black Rock Barbearia</h1>
                <p className="text-d-muted mt-5 max-w-md text-lg">Corte preciso, barba alinhada e cerveja gelada. Desde 2014 na Vila Madalena.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#agendar" className="btn-d">Agendar horário</a>
                  <a href="#servicos" className="btn-d btn-d-ghost">Ver serviços</a>
                </div>
              </div>
              <Pic i={0} label="Foto da barbearia" icon={<Scissors size={72} />} className="r-d aspect-[4/5] w-full" />
            </div>
          </Section>

          <Section id="servicos" alt>
            <Heading title="Serviços" sub="Preços fechados, sem surpresa no fim." />
            <div className="border-d-t">
              {services.map((s) => (
                <div key={s.name} className="border-d-b flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <h3 className="d-display text-2xl">{s.name}</h3>
                    <p className="text-d-muted text-sm">{s.text} · {s.min} min</p>
                  </div>
                  <span className="text-d-accent d-display text-3xl">R$ {s.price}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section id="equipe">
            <Heading title="Quem corta" sub="Três barbeiros, cada um com sua especialidade." />
            <div className="grid gap-4 sm:grid-cols-3">
              {barbers.map((b, i) => (
                <article key={b.name}>
                  <Pic i={i} label={`Foto de ${b.name}`} icon={b.icon} className="r-d aspect-[4/5] w-full" />
                  <h3 className="d-display mt-4 text-2xl">{b.name}</h3>
                  <p className="text-d-muted text-sm">{b.role}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section id="galeria" alt>
            <Heading title="Trabalhos recentes" sub="Toque para ampliar. Filtre pelo estilo." />
            <Gallery items={gallery} cats={["Degradê", "Social", "Barba", "Navalhado"]} />
          </Section>

          <Section id="agendar">
            <Heading title="Agende em 3 passos" sub="Escolha o serviço, o barbeiro e o horário. Horários riscados já estão ocupados." />
            <div className="max-w-2xl">
              <Wizard
                doneTitle="Horário confirmado!"
                doneText="Você receberia a confirmação e um lembrete no WhatsApp."
                summary={(a) => [["Serviço", a.service], ["Barbeiro", a.barber], ["Quando", `${a.when_day} às ${a.when_slot}`]]}
                steps={[
                  { key: "service", title: "Qual serviço?", type: "choice", options: services.map((s) => ({ value: s.name, label: s.name, sub: `R$ ${s.price} · ${s.min} min` })) },
                  { key: "barber", title: "Com quem?", type: "choice", options: barbers.map((b) => ({ value: b.name, label: b.name, sub: b.role })) },
                  { key: "when", title: "Qual dia e horário?", type: "when", slots: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"] },
                ]}
              />
            </div>
          </Section>

          <Section alt>
            <Heading title="Quem já passou por aqui" />
            <Quotes items={quotes} stars />
          </Section>

          <Section id="contato">
            <Heading title="Onde estamos" />
            <Info address="Rua Harmonia, 120 — Vila Madalena, São Paulo/SP"
              hours={[["Segunda a sexta", "9h às 20h"], ["Sábado", "9h às 18h"], ["Domingo", "Fechado"]]} />
            <a href={wa("Oi! Vi a demo de barbearia da Avance e quero um site assim.")} className="btn-d mt-10"><Sparkles size={18} /> Quero um site assim para a minha barbearia</a>
          </Section>

          <DemoFooter><p>© Black Rock Barbearia (nome fictício, demonstração).</p></DemoFooter>
        </Wrap>
      )}
    </DemoShell>
  );
}
