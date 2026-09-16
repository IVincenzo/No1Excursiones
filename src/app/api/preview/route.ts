import type { PayloadRequest } from "payload";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import config from "@/payload.config";

function isSafePreviewPath(path: string | null): path is string {
  return Boolean(
    path &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("\\"),
  );
}

export async function GET(request: Request): Promise<Response> {
  const payload = await getPayload({ config });
  const path = new URL(request.url).searchParams.get("path");
  if (!isSafePreviewPath(path))
    return new Response("Chemin de prévisualisation invalide.", {
      status: 400,
    });

  try {
    const { user } = await payload.auth({
      headers: request.headers,
      req: request as unknown as PayloadRequest,
    });
    if (!user)
      return new Response(
        "Vous devez être connecté à Payload pour prévisualiser un brouillon.",
        { status: 403 },
      );
  } catch (error) {
    payload.logger.error({ err: error }, "Preview authentication failed");
    return new Response(
      "Vous devez être connecté à Payload pour prévisualiser un brouillon.",
      { status: 403 },
    );
  }

  const draft = await draftMode();
  draft.enable();
  return Response.redirect(new URL(path, request.url));
}
