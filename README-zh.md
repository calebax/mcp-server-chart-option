# MCP Server Chart Option

<p>
  <a href="README.md">English</a> |
  <a href="README-zh.md">中文</a>
</p>

用于根据输入数据，动态生成适用于各类图表组件库的动态图表配置的 MCP 服务。

## 主要特性

- 动态生成图表配置，支持多种图表类型
- 提供统一的接口格式，方便与不同前端图表库集成

## 支持的图表组件库

- ECharts

## 接口说明

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

## 集成使用

MCP Server 可被多种 **支持 MCP 协议的客户端** 自动调用，例如：

- Claude Desktop / VSCode / Cursor / Cherry Studio / Cline 等。

Mac 系统配置:

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

Windows 系统配置:

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



## 以 Streamable 模式运行

### 直接运行

全局安装.

```bash
npm install -g mcp-chart-option
```

启动服务

```bash
# Streamable 模式运行
mcp-chart-option --transport streamable
```

服务启动后可通过以下地址访问：

- Streamable transport: `http://localhost:1755/mcp`

### Docker 部署

进入 docker 目录：

```bash
cd docker
```

启动容器：

```bash
docker compose up -d
```

访问地址：

- Streamable 模式: http://localhost:1755/mcp

## CLI Options

```plain
MCP Chart Option CLI

Options:
  --transport, -t  Specify the transport protocol: "stdio", "streamable" (default: "stdio")
  --host, -h       Specify the host for streamable transport (default: localhost)
  --port, -p       Specify the port for streamable transport (default: 1755)
  --endpoint, -e   Specify the endpoint for the transport:
                   - For streamable: default is "/mcp"
  --component, -c  Specify the chart component to use, e.g. "echarts", (default: "echarts")
  --help, -H       Show this help message
```



## 示例

**输入示例：**

```json
{
  "name": "create_pie_chart_option",
  "arguments": {
    "data": [
      { "name": "分类一", "value": 17 },
      { "name": "分类二", "value": 55 }
    ]
  }
}
```

**输出示例（ECharts option）：**

```json
{
  "series": [
    {
      "type": "pie",
      "data": [
        { "name": "分类一", "value": 17 },
        { "name": "分类二", "value": 55 }
      ]
    }
  ]
}
```

## 参考

[mcp-server-chart (AntV)](https://github.com/antvis/mcp-server-chart)
