import { z } from "zod";
import { zodToJsonSchema as zodToJsonSchemaOriginal } from "zod-to-json-schema";

export const zodToJsonSchema = (schema: Record<string, z.ZodType<any>>) => {
  return zodToJsonSchemaOriginal(z.object(schema), {
    rejectedAdditionalProperties: undefined,
    $refStrategy: "none",
  });
};
