FROM node:20-alpine AS base

# Set workdir
WORKDIR /app

# Global install of mcp-chart-option
RUN npm install -g mcp-chart-option

EXPOSE 1755

# Start the server (using streamable for transmission)
CMD ["mcp-chart-option", "--transport", "streamable", "--port", "1755"]
