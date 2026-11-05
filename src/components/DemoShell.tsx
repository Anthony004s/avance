import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Smartphone, Monitor } from "lucide-react";
import { wa, config } from "../config";

type Props = {
  niche: string;
  /** Estilos alternativos da demo (o primeiro é o padrão). Ex.: ["Moderno", "Vintage"] */
  variants?: string[];
  /** Pode ser um conteúdo fixo ou uma função que recebe o estilo escolhido. */
  children: ReactNode | ((variant: string) => ReactNode);
};

/*
  "Ver no celular": em vez de espremer a demo numa caixa estreita (o que NÃO muda o layout,
  porque os breakpoints do CSS olham a largura da janela), a demo é aberta dentro de um iframe
  de 390px com a própria URL + ?embed=1. Assim ela renderiza como num celular de verdade.
  No modo embed, esta barra e o botão flutuante do WhatsApp não aparecem.
*/
export default function DemoShell({ niche, variants, children }: Props) {
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const embed = params.get("embed") === "1";
  const fromUrl = params.get("v");

  const [phone, setPhone] = useState(false);
  const [variant, setVariant] = useState(variants?.includes(fromUrl ?? "") ? (fromUrl as string) : variants?.[0] ?? "");
  const body = typeof children === "function" ? children(variant) : children;

  // Dentro do iframe: só a demo, sem barra da Avance.
  if (embed) {
    return (
      <div className="min-h-screen bg-black">
        {body}
        <footer className="bg-black py-6 text-center text-xs text-white/50">Site criado pela Avance</footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-2 border-b border-white/15 bg-black/90 px-4 py-2 text-xs backdrop-blur">
        <span className="font-semibold text-white/70">
          <span className="mr-2 inline-block h-2 w-2 bg-brand align-middle" />
          Isso é uma demonstração Avance
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/#demos" className="px-3 py-1.5 text-white/80 transition hover:bg-white/10 hover:text-white">
            ← Voltar às demos
          </Link>
          {variants && (
            <div role="group" aria-label="Estilo da demo" className="flex items-center border border-white/25">
              <span className="px-2.5 text-white/50">Estilo</span>
              {variants.map((v) => (
                <button
                  key={v}
                  aria-pressed={variant === v}
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 font-semibold transition ${variant === v ? "bg-white text-black" : "hover:bg-white/10"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
          <button
            aria-pressed={phone}
            onClick={() => setPhone(!phone)}
            className="hidden items-center gap-1.5 border border-white/25 px-3 py-1.5 transition hover:bg-white hover:text-black sm:flex"
          >
            {phone ? <Monitor size={14} /> : <Smartphone size={14} />}
            {phone ? "Ver no desktop" : "Ver no celular"}
          </button>
          <a
            href={wa(`Oi! Vi a demo de ${niche} da ${config.company} e quero um site assim.`)}
            target="_blank"
            rel="noreferrer"
            className="bg-brand px-3 py-1.5 font-bold text-white transition hover:bg-white hover:text-black"
          >
            {config.cta.demo}
          </a>
        </div>
      </div>

      {phone ? (
        <div className="grid place-items-center px-4 py-8" style={{ background: "radial-gradient(60% 50% at 50% 40%, #1c1c1c, #000)" }}>
          <iframe
            key={variant}
            title={`Demo de ${niche} no celular`}
            src={`${pathname}?embed=1&v=${encodeURIComponent(variant)}`}
            className="w-[390px] max-w-full rounded-[44px] border-[10px] border-neutral-800 bg-black shadow-[0_0_0_1px_rgba(255,255,255,.12),0_30px_80px_rgba(0,0,0,.6)]"
            style={{ height: "min(780px, calc(100vh - 7.5rem))" }}
          />
          <p className="mt-5 text-xs text-white/50">Visualização em tela de celular (390 px). O que você marca aqui não é salvo ao trocar de modo.</p>
        </div>
      ) : (
        <>
          {body}
          <footer className="bg-black py-6 text-center text-xs text-white/50">Site criado pela Avance</footer>
        </>
      )}
    </div>
  );
}
