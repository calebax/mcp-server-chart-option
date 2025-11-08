import { z } from "zod";

const TitleText = z
  .string()
  .optional()
  .default("")
  .describe("Set the title of chart.");
const TitleLeft = z
  .enum(["auto", "left", "center", "right"])
  .optional()
  .default("auto")
  .describe("Set the position of title.");

export const TitleSchema = z
  .object({
    text: TitleText,
    left: TitleLeft,
  })
  .optional()
  .describe("Set the title of chart.");

export const ShowSchema = z
  .boolean()
  .optional()
  .default(true)
  .describe("Show or not.");

export const LegendSchema = z
  .object({
    show: ShowSchema,
  })
  .optional()
  .describe("Set the legend of chart.");
