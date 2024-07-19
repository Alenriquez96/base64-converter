"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface SizeChartProps {
  chartData: {
    item: string;
    size: number;
  }[];
}

const SizeChart = ({ chartData }: SizeChartProps) => {
  const chartConfig = {
    size: {
      label: "Size (Bytes) ",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="m-8 *:my-4">
      <Card>
        <CardHeader>
          <CardTitle>Size Comparison</CardTitle>
          <CardDescription>
            This chart provides a comparison between original File size and
            converted base64 size
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="item"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />

              <Bar dataKey="size" fill="var(--color-original)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SizeChart;
