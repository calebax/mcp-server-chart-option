import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { ChartOptionBuild } from "../type.js";
import { echartsOptionRegistry, type EChartsType } from "./registry.js";

/**
 * ECharts 配置构建器
 */
class EChartsOptionBuilder implements ChartOptionBuild {
  buildChartOption(type: string, options: Record<string, any>) {
    const buildFn = echartsOptionRegistry[type as EChartsType];
    if (!buildFn) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `ECharts type ${type} is not supported.`
      );
    }

    const base = buildBaseOption(options);
    const chartOption = buildFn(options);
    return {
      ...base,
      ...chartOption,
    };
  }
}

function buildBaseOption(args: Record<string, any>) {
  return {
    title: args.title ?? {},
    legend: args.legend ?? {},
  };
}

export const echarts = new EChartsOptionBuilder();
