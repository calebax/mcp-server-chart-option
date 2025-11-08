import { buildPieOption } from "./charts/pie.js";
import { buildColumnOption } from "./charts/column.js";

export const echartsOptionRegistry = {
  pie: buildPieOption,
  column: buildColumnOption,
} as const;

export type EChartsType = keyof typeof echartsOptionRegistry;
