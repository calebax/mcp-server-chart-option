import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema, AxisXTitleSchema, AxisYTitleSchema } from "./base.js";

// Line chart data schema
const data = z.object({
  category: z.string(),
  value: z.number(),
  group: z.string().optional(),
});

const schema = {
  data: z
    .array(data)
    .describe(
      "Data for line chart, it should be an array of objects, each object contains a `category` field and a `value` field, such as, [{ category: '2015', value: 23 }, { category: '2016', value: 32 }]."
    )
    .nonempty({ message: "Line chart data cannot be empty." }),
  title: TitleSchema,
  axisXTitle: AxisXTitleSchema,
  axisYTitle: AxisYTitleSchema,
};
const tool = {
  name: "create_line_chart_option",
  description: "Create a chart option for line chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const line = {
  tool,
  schema,
};
