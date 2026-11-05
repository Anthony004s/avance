import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";
import Home from "./pages/Home";
import Barbearia from "./pages/Barbearia";
import Restaurante from "./pages/Restaurante";
import Advocacia from "./pages/Advocacia";
import Salao from "./pages/Salao";
import Clinica from "./pages/Clinica";
import WhatsFloat from "./components/WhatsFloat";

// Ao trocar de página, volta ao topo (ou rola até a âncora, ex.: /#demos)
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // espera a página montar antes de procurar a âncora
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// O botão flutuante some dentro do "Ver no celular" (iframe com ?embed=1)
function Floating() {
  const { search } = useLocation();
  return new URLSearchParams(search).get("embed") === "1" ? null : <WhatsFloat />;
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo/barbearia" element={<Barbearia />} />
      <Route path="/demo/restaurante" element={<Restaurante />} />
      <Route path="/demo/advocacia" element={<Advocacia />} />
      <Route path="/demo/salao" element={<Salao />} />
      <Route path="/demo/clinica" element={<Clinica />} />
    </Routes>
    <Floating />
  </BrowserRouter>
);
