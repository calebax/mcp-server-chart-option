export function buildColumnOption(args: Record<string, any>) {
  const { data, stack: isStacked = false } = args;

  if (!Array.isArray(data) || data.length === 0) {
    return {
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: [] },
      yAxis: { type: "value" },
      series: [],
    };
  }

  const map = new Map<string, Map<string, number>>();
  for (const { category, value, group } of data) {
    const g = group ?? "__default__";
    if (!map.has(g)) map.set(g, new Map());
    map.get(g)!.set(category, value);
  }

  const categories = Array.from(new Set(data.map((d) => d.category)));
  const groups = Array.from(map.keys()).sort();
  const isMultiGroup = map.size > 1;

  const series = groups.map((g) => ({
    name: g === "__default__" ? "" : g,
    type: "bar",
    ...(isMultiGroup && isStacked ? { stack: "total" } : {}),
    data: categories.map((c) => map.get(g)?.get(c) ?? 0),
  }));

  return {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: categories },
    yAxis: { type: "value" },
    series,
  };
}
