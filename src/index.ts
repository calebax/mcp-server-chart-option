#!/usr/bin/env node
import { parseArgs } from "node:util";
import { runStdioServer } from "./server.js";
import { logger } from "./utils/logger.js";

// Parse command line arguments
const { values } = parseArgs({
  options: {
    transport: {
      type: "string",
      short: "t",
      default: "stdio",
    },
    host: {
      type: "string",
      short: "h",
      default: "localhost",
    },
    port: {
      type: "string",
      short: "p",
      default: "1755",
    },
    endpoint: {
      type: "string",
      short: "e",
      default: "", // We'll handle defaults per transport type
    },
    component: {
      type: "string",
      short: "c",
      default: "echarts",
    },
    help: {
      type: "boolean",
      short: "H",
    },
  },
});

if (values.help) {
  console.log(`
MCP Server Chart CLI

Options:
  --transport, -t  Specify the transport protocol: "stdio" or "streamable" (default: "stdio")
  --host, -h       Specify the host for SSE or streamable transport (default: localhost)
  --port, -p       Specify the port for SSE or streamable transport (default: 1122)
  --endpoint, -e   Specify the endpoint for the transport:
                   - For streamable: default is "/mcp"
  --component, -c  Specify the chart component to use, e.g. "echarts", (default: "echarts")
  --help, -H       Show this help message
  `);
  process.exit(0);
}

const transport = values.transport.toLowerCase();
const component = values.component || "echarts";

if (transport === "streamable") {
  logger.setIsStdio(false);
} else {
  logger.setIsStdio(true);
  runStdioServer(component).catch(console.error);
}
