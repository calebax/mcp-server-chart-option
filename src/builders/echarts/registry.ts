import { buildPieOption } from "./charts/pie.js";
import { buildColumnOption } from "./charts/column.js";
import { buildLineOption } from "./charts/line.js";

export const echartsOptionRegistry = {
  pie: buildPieOption,
  column: buildColumnOption,
  line: buildLineOption,
} as const;

export type EChartsType = keyof typeof echartsOptionRegistry;
