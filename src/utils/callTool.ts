import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import * as Charts from "../charts/index.js";
import * as Builders from "../builders/index.js";
import { ComponentName } from "../builders/type.js";
import { logger } from "./logger.js";

// Chart type mapping
const CHART_TYPE_MAP = {
  create_pie_chart_option: "pie",
  create_column_chart_option: "column",
  create_line_chart_option: "line",
} as const;

/**
 * Call a tool to generate a chart based on the provided name and arguments.
 * @param tool The name of the tool to call, e.g., "generate_area_chart".
 * @param args The arguments for the tool, which should match the expected schema for the chart type.
 * @returns
 */
export async function callTool(
  component: ComponentName,
  tool: string,
  args: object = {}
) {
  logger.info(`Calling tool: ${tool}`);
  const chartType = CHART_TYPE_MAP[tool as keyof typeof CHART_TYPE_MAP];

  if (!chartType) {
    logger.error(`Unknown tool: ${tool}`);
    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${tool}.`);
  }

  try {
    const schema = Charts[chartType].schema;
    // 验证参数
    if (schema) {
      const result = z.object(schema).safeParse(args);
      if (!result.success) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Invalid parameters: ${result.error.message}`
        );
      }
    }

    const builder = Builders[component];

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            builder.buildChartOption(chartType, args),
            null,
            2
          ),
        },
      ],
    };
  } catch (error: any) {
    const errorMsg = error?.message || "Unknown error";
    logger.error(`Error calling tool ${tool}: ${errorMsg}`);
    if (error instanceof McpError) throw error;

    throw new McpError(
      ErrorCode.InternalError,
      `Failed to create chart option: ${errorMsg}`
    );
  }
}
