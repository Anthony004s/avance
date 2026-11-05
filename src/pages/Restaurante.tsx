import { useMemo, useState } from "react";
import { Flame, Leaf, Wheat, Plus, Minus, ShoppingBag, X, MessageCircle, UtensilsCrossed } from "lucide-react";
import DemoShell from "../components/DemoShell";
import { Wrap, Section, Heading, DemoNav, DemoFooter, Pic, Info, type Theme } from "../components/demoKit";
import { wa } from "../config";

const themes: Record<string, Theme> = {
  Rústico: {
    "--bg": "#1a0f0b", "--surface": "#26160f", "--ink": "#f4e8d6", "--muted": "#b8a48c", "--line": "rgba(244,232,214,.16)",
    "--accent": "#d9480f", "--onaccent": "#ffffff", "--r": "10px", "--r-btn": "8px",
    "--display": '"Fraunces", serif', "--dw": "700", "--body": '"DM Sans", sans-serif',
  },
  Minimalista: {
    "--bg": "#faf8f4", "--surface": "#f0ebe2", "--ink": "#1b1b1b", "--muted": "#666666", "--line": "rgba(0,0,0,.14)",
    "--accent": "#c2410c", "--onaccent": "#ffffff", "--r": "0px", "--r-btn": "0px",
    "--display": '"DM Sans", sans-serif', "--dw": "700", "--body": '"DM Sans", sans-serif',
  },
};

type Item = { id: string; cat: string; name: string; desc: string; price: number; veg?: boolean; gf?: boolean; featured?: boolean };
const cats = ["Entradas", "Pratos", "Sobremesas", "Bebidas"];
const menu: Item[] = [
  { id: "e1", cat: "Entradas", name: "Pão de alho na brasa", desc: "Pão artesanal, manteiga de ervas e alho assado.", price: 24, veg: true },
  { id: "e2", cat: "Entradas", name: "Linguiça artesanal", desc: "Porção na brasa com vinagrete e farofa.", price: 38 },
  { id: "e3", cat: "Entradas", name: "Queijo coalho grelhado", desc: "Com melaço de cana e orégano.", price: 32, veg: true, gf: true },
  { id: "e4", cat: "Entradas", name: "Bolinho de feijoada", desc: "Seis unidades com geleia de pimenta.", price: 34 },
  { id: "p1", cat: "Pratos", name: "Picanha na brasa", desc: "400 g com arroz, feijão tropeiro, vinagrete e farofa.", price: 89, gf: true, featured: true },
  { id: "p2", cat: "Pratos", name: "Costela de panela", desc: "Cozida por 8 horas, com mandioca e agrião.", price: 74, gf: true, featured: true },
  { id: "p3", cat: "Pratos", name: "Risoto de cogumelos", desc: "Arroz arbóreo, cogumelos frescos e parmesão.", price: 62, veg: true, gf: true, featured: true },
  { id: "p4", cat: "Pratos", name: "Moqueca de peixe", desc: "Peixe do dia, leite de coco, dendê e pirão.", price: 78, gf: true },
  { id: "p5", cat: "Pratos", name: "Legumes assados", desc: "Seleção da horta com tahine e castanhas.", price: 48, veg: true, gf: true },
  { id: "s1", cat: "Sobremesas", name: "Pudim de leite", desc: "Calda de caramelo queimado.", price: 18, veg: true, gf: true },
  { id: "s2", cat: "Sobremesas", name: "Petit gâteau", desc: "Com sorvete de creme.", price: 28, veg: true },
  { id: "s3", cat: "Sobremesas", name: "Goiabada com queijo", desc: "Goiabada cascão e queijo minas curado.", price: 20, veg: true, gf: true },
  { id: "b1", cat: "Bebidas", name: "Limonada suíça", desc: "Jarra de 500 ml.", price: 16, veg: true, gf: true },
  { id: "b2", cat: "Bebidas", name: "Suco da fruta", desc: "Laranja, abacaxi com hortelã ou maracujá.", price: 14, veg: true, gf: true },
  { id: "b3", cat: "Bebidas", name: "Cerveja artesanal", desc: "Long neck, pergunte pelos rótulos.", price: 22, veg: true },
  { id: "b4", cat: "Bebidas", name: "Refrigerante", desc: "Lata 350 ml.", price: 8, veg: true, gf: true },
];
const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Restaurante() {
  const [tab, setTab] = useState(cats[1]);
  const [veg, setVeg] = useState(false);
  const [gf, setGf] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [sheet, setSheet] = useState<"closed" | "cart" | "sent">("closed");

  const add = (id: string, d = 1) =>
    setCart((c) => {
      const q = (c[id] ?? 0) + d;
      const n = { ...c };
      if (q <= 0) delete n[id]; else n[id] = q;
      return n;
    });

  const lines = useMemo(() => menu.filter((m) => cart[m.id]).map((m) => ({ ...m, qty: cart[m.id] })), [cart]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const message = `Olá! Gostaria de fazer um pedido:\n\n${lines.map((l) => `${l.qty}x ${l.name} — ${brl(l.qty * l.price)}`).join("\n")}\n\nTotal: ${brl(total)}`;
  const shown = menu.filter((m) => m.cat === tab && (!veg || m.veg) && (!gf || m.gf));

  return (
    <DemoShell niche="restaurante" variants={["Rústico", "Minimalista"]}>
      {(v) => (
        <Wrap theme={themes[v]}>
          <DemoNav brand="Sabor & Brasa" ctaHref="#cardapio" cta="Ver cardápio"
            links={[["Destaques", "#destaques"], ["Cardápio", "#cardapio"], ["A casa", "#casa"], ["Horários", "#contato"]]} />

          <Section>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="d-display text-6xl leading-[0.98] md:text-8xl">Sabor & Brasa</h1>
                <p className="text-d-muted mt-5 max-w-md text-lg">Carne na brasa, comida de panela e mesa cheia. Do jeito da casa desde 2009, em Pinheiros.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#cardapio" className="btn-d"><ShoppingBag size={18} /> Fazer pedido</a>
                  <a href="#contato" className="btn-d btn-d-ghost">Como chegar</a>
                </div>
              </div>
              <Pic i={1} label="Foto do prato da casa" icon={<Flame size={72} />} className="r-d aspect-square w-full" />
            </div>
          </Section>

          <Section id="destaques" alt>
            <Heading title="Hoje na casa" sub="Os três pratos que mais saem. Toque para adicionar ao pedido." />
            <div className="grid gap-4 md:grid-cols-3">
              {menu.filter((m) => m.featured).map((m, i) => (
                <article key={m.id} className="border-d r-d overflow-hidden">
                  <Pic i={i} label={m.name} icon={<UtensilsCrossed size={44} />} className="aspect-[4/3] w-full" />
                  <div className="space-y-2 p-5">
                    <h3 className="d-display text-2xl">{m.name}</h3>
                    <p className="text-d-muted text-sm">{m.desc}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="d-display text-2xl">{brl(m.price)}</span>
                      <button className="btn-d btn-d-sm" onClick={() => add(m.id)}><Plus size={16} /> Adicionar</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="cardapio">
            <Heading title="Cardápio" sub="Filtre por vegetariano ou sem glúten e monte o pedido." />
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {cats.map((c) => <button key={c} className="chip-d" aria-pressed={tab === c} onClick={() => setTab(c)}>{c}</button>)}
              <span className="mx-1 hidden h-6 w-px bg-d-line sm:block" />
              <button className="chip-d inline-flex items-center gap-1.5 text-sm" aria-pressed={veg} onClick={() => setVeg(!veg)}><Leaf size={15} /> Vegetariano</button>
              <button className="chip-d inline-flex items-center gap-1.5 text-sm" aria-pressed={gf} onClick={() => setGf(!gf)}><Wheat size={15} /> Sem glúten</button>
            </div>
            <ul key={tab + veg + gf} className="pop border-d-t">
              {shown.map((m) => (
                <li key={m.id} className="border-d-b flex items-center justify-between gap-4 py-5">
                  <div className="min-w-0">
                    <h3 className="d-display flex flex-wrap items-center gap-2 text-xl">
                      {m.name}
                      {m.veg && <Leaf size={15} className="text-d-accent" aria-label="Vegetariano" />}
                      {m.gf && <Wheat size={15} className="text-d-accent" aria-label="Sem glúten" />}
                    </h3>
                    <p className="text-d-muted text-sm">{m.desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="d-display text-lg">{brl(m.price)}</span>
                    {cart[m.id] ? (
                      <div className="border-d r-d flex items-center">
                        <button aria-label={`Remover ${m.name}`} onClick={() => add(m.id, -1)} className="p-2"><Minus size={16} /></button>
                        <span className="w-6 text-center text-sm" aria-live="polite">{cart[m.id]}</span>
                        <button aria-label={`Adicionar ${m.name}`} onClick={() => add(m.id)} className="p-2"><Plus size={16} /></button>
                      </div>
                    ) : (
                      <button aria-label={`Adicionar ${m.name}`} className="btn-d" style={{ padding: ".55rem" }} onClick={() => add(m.id)}><Plus size={18} /></button>
                    )}
                  </div>
                </li>
              ))}
              {shown.length === 0 && <li className="text-d-muted py-8">Nenhum item nessa categoria com os filtros escolhidos. Desmarque um filtro.</li>}
            </ul>
          </Section>

          <Section id="casa" alt>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <Pic i={3} label="Foto do salão" icon={<UtensilsCrossed size={56} />} className="r-d aspect-[4/3] w-full" />
              <div>
                <h2 className="d-display text-4xl md:text-5xl">A casa</h2>
                <p className="text-d-muted mt-4">Começou como uma churrasqueira de quintal e virou ponto de almoço do bairro. A brasa é de carvão de verdade, as panelas são de ferro e o tempero é o da vó da dona Marta.</p>
                <p className="text-d-muted mt-3">Aceitamos reservas para grupos a partir de 6 pessoas. Chame no WhatsApp.</p>
              </div>
            </div>
          </Section>

          <Section id="contato">
            <Heading title="Horários e endereço" />
            <Info address="Rua dos Pinheiros, 800 — Pinheiros, São Paulo/SP"
              hours={[["Terça a sexta", "11h30 às 15h · 18h às 23h"], ["Sábado e domingo", "11h30 às 17h"], ["Segunda", "Fechado"]]} />
          </Section>

          <DemoFooter><p>© Sabor & Brasa (nome fictício, demonstração).</p></DemoFooter>

          {count > 0 && (
            <div className="sticky bottom-0 z-30 border-d-t bg-d-surface">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 py-3 pl-5 pr-20">
                <p className="text-sm"><strong>{count}</strong> {count === 1 ? "item" : "itens"} · <strong>{brl(total)}</strong></p>
                <button className="btn-d btn-d-sm" onClick={() => setSheet("cart")}><ShoppingBag size={16} /> Ver pedido</button>
              </div>
            </div>
          )}

          {sheet !== "closed" && (
            <div role="dialog" aria-modal="true" aria-label="Seu pedido" className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 md:items-center md:p-4" onClick={() => setSheet("closed")}>
              <div className="pop bg-d-surface max-h-[88vh] w-full max-w-md overflow-y-auto p-6 md:rounded-[var(--r)]" style={{ background: "var(--bg)", color: "var(--ink)" }} onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="d-display text-2xl">{sheet === "cart" ? "Seu pedido" : "Mensagem no WhatsApp"}</h3>
                  <button aria-label="Fechar" onClick={() => setSheet("closed")}><X /></button>
                </div>
                {sheet === "cart" ? (
                  <>
                    {lines.length === 0 ? <p className="text-d-muted py-6">Seu pedido está vazio. Adicione itens pelo cardápio.</p> : (
                      <ul className="border-d-t">
                        {lines.map((l) => (
                          <li key={l.id} className="border-d-b flex items-center justify-between gap-3 py-3 text-sm">
                            <span>{l.name}<br /><span className="text-d-muted">{brl(l.price)}</span></span>
                            <div className="flex items-center gap-2">
                              <button aria-label={`Remover ${l.name}`} className="chip-d" style={{ padding: ".35rem" }} onClick={() => add(l.id, -1)}><Minus size={14} /></button>
                              <span className="w-5 text-center">{l.qty}</span>
                              <button aria-label={`Adicionar ${l.name}`} className="chip-d" style={{ padding: ".35rem" }} onClick={() => add(l.id)}><Plus size={14} /></button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="d-display mt-5 flex justify-between text-2xl"><span>Total</span><span>{brl(total)}</span></p>
                    <button disabled={!lines.length} className="btn-d mt-5 w-full" onClick={() => setSheet("sent")}><MessageCircle size={18} /> Pedir pelo WhatsApp</button>
                  </>
                ) : (
                  <>
                    <p className="text-d-muted mb-4 text-sm">É assim que o pedido chegaria no WhatsApp do restaurante, já pronto e sem digitar nada:</p>
                    <div className="whitespace-pre-line rounded-lg bg-[#dcf8c6] p-4 text-sm text-[#111] shadow">{message}</div>
                    <p className="text-d-muted mt-4 text-sm">Isso é uma demonstração. No site real, este botão abre o WhatsApp do seu restaurante.</p>
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <button className="btn-d btn-d-ghost flex-1" onClick={() => setSheet("cart")}>Voltar</button>
                      <a className="btn-d flex-1" href={wa("Oi! Vi a demo de restaurante da Avance e quero um site assim.")} target="_blank" rel="noreferrer">Quero um site assim</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </Wrap>
      )}
    </DemoShell>
  );
}
