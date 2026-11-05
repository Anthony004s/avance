// Troque aqui: tudo no site lê deste arquivo.
export const config = {
  company: "Avance",
  whatsapp: "5511963308342", // DDI+DDD+número, só dígitos
  email: "ricardoanthony04s.com.br",
  instagram: "https://instagram.com/avance.dsgn",
  cta: { whatsapp: "Falar no WhatsApp", demo: "Quero um site assim", see: "Ver demonstrações" },
  defaultMsg: "Oi! Quero um site para o meu negócio.",
};
export const wa = (text = config.defaultMsg) => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
