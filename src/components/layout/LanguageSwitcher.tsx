"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localizedPath, paths, type Locale, type PageKey } from "@/i18n/config";

const locales: Locale[] = ["en", "es", "fr", "de"];

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1);
  useEffect(() => {
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape")
        setOpen(false);
      if (
        event instanceof MouseEvent &&
        !root.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);
  function href(target: Locale) {
    if (segments.length === 0) return localizedPath(target);
    const page = (Object.keys(paths) as PageKey[]).find(
      (key) => paths[key][locale] === segments[0],
    );
    if (!page) return localizedPath(target);
    if (page === "activities" && segments[1]) {
      const query = new URLSearchParams({
        from: locale,
        to: target,
        slug: segments[1],
      });
      return `/api/i18n/switch?${query.toString()}`;
    }
    return localizedPath(target, page);
  }
  return (
    <li className="nav-item dropdown language-switcher" ref={root}>
      <button
        className="nav-link dropdown-toggle"
        type="button"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((value) => !value)}
      >
        {locale.toUpperCase()}
      </button>
      <ul className={`dropdown-menu dropdown-menu-end${open ? " show" : ""}`}>
        {locales.map((target) => (
          <li key={target}>
            {target === locale ? (
              <span className="dropdown-item active" aria-current="page">
                {target.toUpperCase()}
              </span>
            ) : (
              <Link
                className="dropdown-item"
                href={href(target)}
                hrefLang={target}
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                {target.toUpperCase()}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}
