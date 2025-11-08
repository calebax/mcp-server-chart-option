export interface ChartOptionBuild {
  /**
   * 根据图表类型和参数生成对应的图表配置
   * @param type 图表类型
   * @param args
   * @returns 对应图表系统的配置对象
   */
  buildChartOption(
    type: string,
    args: Record<string, any>
  ): Record<string, any>;
}

const COMPONENTS = ["echarts"] as const;
export type ComponentName = (typeof COMPONENTS)[number];
