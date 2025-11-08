import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema } from "./base.js";

// Column chart data schema
const data = z.object({
  category: z.string(),
  value: z.number(),
  group: z.string().optional(),
});

const schema = {
  title: TitleSchema,
  data: z
    .array(data)
    .describe(
      "Data for column chart, such as, [{ category: '分类一', value: 10 }, { category: '分类二', value: 20 }], when grouping or stacking is needed for column, the data should contain a `group` field, such as, when [{ category: '北京', value: 825, group: '油车' }, { category: '北京', value: 1000, group: '电车' }]."
    )
    .nonempty({ message: "Column chart data cannot be empty." }),
  group: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      "Whether grouping is enabled. When enabled, column charts require a 'group' field in the data. When `group` is true, `stack` should be false."
    ),
  stack: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      "Whether stacking is enabled. When enabled, column charts require a 'group' field in the data. When `stack` is true, `group` should be false."
    ),
};
const tool = {
  name: "create_column_chart_option",
  description: "Create a chart option for column chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const column = {
  tool,
  schema,
};
