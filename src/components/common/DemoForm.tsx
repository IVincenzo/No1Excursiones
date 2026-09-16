"use client";

import { FormEvent, ReactNode, useState } from "react";

export function DemoForm({
  children,
  className,
  message,
}: {
  children: ReactNode;
  className: string;
  message: string;
}) {
  const [result, setResult] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(process.env.NODE_ENV === "production" ? "" : message);
  }
  return (
    <form className={className} onSubmit={submit}>
      {children}
      <div className="mt-3" role="status" aria-live="polite">
        {result}
      </div>
    </form>
  );
}
