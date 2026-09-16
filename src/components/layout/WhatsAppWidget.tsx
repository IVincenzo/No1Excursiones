"use client";

import { useEffect, useRef, useState } from "react";

export function WhatsAppWidget({
  labels,
  phone,
}: {
  labels: {
    open: string;
    close: string;
    online: string;
    greeting: string;
    button: string;
    prefill: string;
  };
  phone?: string;
}) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  if (!phone) return null;
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(labels.prefill)}`;
  return (
    <div className="whatsapp-widget">
      {open && (
        <div
          className="whatsapp-panel"
          ref={panel}
          role="dialog"
          aria-label={labels.button}
        >
          <div className="whatsapp-panel-header">
            <strong>{labels.online}</strong>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
            >
              ×
            </button>
          </div>
          <div className="whatsapp-panel-body">
            <p>{labels.greeting}</p>
            <a
              className="btn btn-success w-100"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {labels.button}
            </a>
          </div>
        </div>
      )}
      <button
        className="whatsapp-fab"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? labels.close : labels.open}
      >
        <span aria-hidden="true">WA</span>
      </button>
    </div>
  );
}
