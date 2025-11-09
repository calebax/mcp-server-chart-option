import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as Charts from "./charts/index.js";
import { ComponentName } from "./builders/type.js";
import {
  startHTTPStreamableServer,
  startStdioMcpServer,
} from "./services/index.js";
import { logger } from "./utils/logger.js";
import { callTool } from "./utils/callTool.js";

/**
 * 创建并配置MCP服务器
 */
export function createServer(component: string): Server {
  const server = new Server(
    {
      name: "mcp-chart-option",
      version: "0.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  setupToolHandlers(server, component as ComponentName);

  server.onerror = (e: Error) => {
    logger.error("Server encountered an error, shutting down", e);
  };

  process.on("SIGINT", async () => {
    logger.info("SIGINT received, shutting down server...");
    await server.close();
    process.exit(0);
  });

  return server;
}

/**
 * Sets up tool handlers for the MCP server.
 */
function setupToolHandlers(server: Server, component: ComponentName): void {
  logger.info(`setting up ${component} tool handlers...`);
  // 设置工具处理器
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: Object.values(Charts).map((chart) => chart.tool),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
    const { name, arguments: args } = request.params;
    logger.info("calling tool", name, args);
    return await callTool(component, name, args);
  });

  logger.info("tool handlers set up");
}

/**
 * Runs the server with stdio transport.
 */
export async function runStdioServer(component: string): Promise<void> {
  const server = createServer(component);
  await startStdioMcpServer(server);
}

/**
 * Runs the server with HTTP streamable transport.
 */
export async function runHTTPStreamableServer(
  component: string,
  host = "localhost",
  port = 1755,
  endpoint = "/mcp"
): Promise<void> {
  await startHTTPStreamableServer(
    () => createServer(component),
    endpoint,
    port,
    host
  );
}
