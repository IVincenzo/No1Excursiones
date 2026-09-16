import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  Payload,
} from "payload";
import { revalidatePath } from "next/cache";

function revalidatePublicContent(payload: Payload) {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
  } catch (error) {
    payload.logger.warn(
      `Runtime revalidation skipped outside Next.js: ${error instanceof Error ? error.message : "unknown error"}`,
    );
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({
  context,
  doc,
  req,
}) => {
  if (context.skipRevalidation) return doc;
  revalidatePublicContent(req.payload);
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({
  context,
  doc,
  req,
}) => {
  if (context.skipRevalidation) return doc;
  revalidatePublicContent(req.payload);
  return doc;
};
