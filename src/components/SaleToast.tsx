"use client";
import { useEffect, useState } from "react";

export function SaleToast() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(1000);
  useEffect(() => {
    let hide: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setValue(Math.random() * 2800 + 50);
      setShow(true);
      hide = setTimeout(() => setShow(false), 3200);
    }, 7000);
    return () => { clearInterval(id); clearTimeout(hide); };
  }, []);
  return (
    <div className={`toast${show ? " show" : ""}`} aria-live="polite">
      <span className="ic">✓</span>
      <div>Venda recebida<small>Pagamento via Pix</small></div>
      <b>+R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
    </div>
  );
}
