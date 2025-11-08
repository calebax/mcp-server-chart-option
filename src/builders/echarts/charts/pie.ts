export function buildPieOption(args: Record<string, any>) {
  return {
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter: "{b}: {c}",
    },
    series: [
      {
        type: "pie",
        radius: "60%",
        data: args.data ?? [],
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
          borderRadius: 5,
        },
      },
    ],
  };
}
