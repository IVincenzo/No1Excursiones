"use client";

import { isDocumentEvent, ready } from "@payloadcms/live-preview";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function RefreshRouteOnSave() {
  const router = useRouter();
  const serverURL =
    typeof window === "undefined"
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
      : window.location.origin;
  const hasSentReadyMessage = useRef(false);
  const onMessage = useCallback(
    (event: MessageEvent) => {
      if (isDocumentEvent(event, serverURL)) router.refresh();
    },
    [router, serverURL],
  );

  useEffect(() => {
    window.addEventListener("message", onMessage);
    if (!hasSentReadyMessage.current) {
      hasSentReadyMessage.current = true;
      ready({ serverURL });
      router.refresh();
    }
    return () => window.removeEventListener("message", onMessage);
  }, [onMessage, router, serverURL]);

  return null;
}
