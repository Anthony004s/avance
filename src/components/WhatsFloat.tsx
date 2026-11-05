import { MessageCircle } from "lucide-react";
import { wa } from "../config";

export default function WhatsFloat() {
  return (
    <a
      href={wa()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center bg-brand text-white shadow-[0_0_0_1px_rgba(255,255,255,.15)] transition hover:bg-white hover:text-black"
    >
      <MessageCircle />
    </a>
  );
}
