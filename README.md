# MCP Server Chart Option

<p>
  <b>English</b> |
  <a href="README-zh.md">中文</a>
</p>

An MCP (Model Context Protocol) service that dynamically generates chart configuration options for various charting libraries based on input data.

---

## Key Features

- Dynamically generates chart configurations supporting multiple chart types
- Provides a unified interface format for easy integration with various front-end charting libraries

---

## Supported Chart Libraries

- [ECharts](https://echarts.apache.org/)

---

## API Methods

1. create_pie_chart_option
2. create_line_chart_option
3. create_column_chart_option
4. create_area_chart_option
5. create_bar_chart_option
6. create_radar_chart_option
7. create_funnel_chart_option
8. create_histogram_chart_option
9. create_scatter_chart_option
10. create_boxplot_chart_option

---

## Integration

The MCP Server can be automatically invoked by multiple MCP-compatible clients, such as:

- Claude Desktop / VSCode / Cursor / Cherry Studio / Cline, and others.

### macOS Configuration

```json
{
  "mcpServers": {
    "mcp-chart-option": {
      "command": "npx",
      "args": ["-y", "mcp-chart-option"]
    }
  }
}
```

### Windows Configuration

```json
{
  "mcpServers": {
    "mcp-chart-option": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "mcp-chart-option"]
    }
  }
}
```

When the MCP client starts, it will automatically execute:

```bash
npx -y mcp-chart-option
```

to launch the service.

---

## Run in Streamable Mode

### Run Directly

Install globally:

```bash
npm install -g mcp-chart-option
```

Start the server:

```bash
# Run with Streamable transport
mcp-chart-option --transport streamable
```

After startup, the service will be available at:

- Streamable endpoint: `http://localhost:1755/mcp`

---

### Docker Deployment

Enter the docker directory:

```bash
cd docker
```

Start the container:

```bash
docker compose up -d
```

Access the service at:

- Streamable endpoint: `http://localhost:1755/mcp`

---

## CLI Options

```plain
MCP Chart Option CLI

Options:
  --transport, -t  Specify the transport protocol: "stdio" or "streamable" (default: "stdio")
  --host, -h       Specify the host for streamable transport (default: localhost)
  --port, -p       Specify the port for streamable transport (default: 1755)
  --endpoint, -e   Specify the transport endpoint (default: "/mcp")
  --component, -c  Specify the chart component library to use, e.g., "echarts" (default: "echarts")
  --help, -H       Show this help message
```

---

## Example

**Input Example:**

```json
{
  "name": "create_pie_chart_option",
  "arguments": {
    "data": [
      { "name": "Category A", "value": 17 },
      { "name": "Category B", "value": 55 }
    ]
  }
}
```

**Output Example (ECharts option):**

```json
{
  "series": [
    {
      "type": "pie",
      "data": [
        { "name": "Category A", "value": 17 },
        { "name": "Category B", "value": 55 }
      ]
    }
  ]
}
```

---

## Reference

- [mcp-server-chart (AntV)](https://github.com/antvis/mcp-server-chart)
