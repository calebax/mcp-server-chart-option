import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema } from "./base.js";

const data = z.object({
  name: z.string().describe("Name of the category or segment."),
  value: z.number().describe("Numeric value corresponding to the segment."),
});

const schema = {
  data: z
    .array(data)
    .describe(
      "Data for pie chart, it should be an array of objects, each object contains a `name` field and a `value` field, such as, [{ name: '分类一', value: 27 }]."
    )
    .nonempty({ message: "Pie chart data cannot be empty." }),
  title: TitleSchema,
};

const tool = {
  name: "create_pie_chart_option",
  description: "Create a chart option for pie chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const pie = {
  tool,
  schema,
};
