"use client";
import { useEffect } from "react";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// get All data from API

const chartConfig = {
  views: {
    label: "Trainees",
  },
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  occupational: {
    label: "Occupational",
    color: "hsl(var(--chart-2))",
  },
};

export default function TotalTraineesChart() {
  const [cities, setCities] = React.useState(null);
  const [activeChart, setActiveChart] = React.useState("standard");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getallcities");
        const data = await response.json();

        // console.log(data); ken

        setCities(data);
      } catch (error) {
        console.error("Failed to fetch session data:", error);
      }
    };

    fetchSession();
  }, []);

  const total = React.useMemo(() => {
    if (cities === null) return { standard: 0, occupational: 0 };
    return {
      standard: cities.reduce((acc, curr) => acc + curr.standard, 0),
      occupational: cities.reduce((acc, curr) => acc + curr.occupational, 0),
    };
  }, [cities]);

  if (cities === null) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-2">
            <Skeleton className={"w-[300px] h-[30px]  bg-[#b7b7b7] rounded"} />
            <Skeleton className={"w-[300px] h-[20px]  bg-[#b7b7b7] rounded"} />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className={"w-[100px] h-[55px]  bg-[#b7b7b7] rounded"} />
            <Skeleton className={"w-[100px] h-[55px]  bg-[#b7b7b7] rounded"} />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className={"w-[150px] h-[200px]  bg-[#b7b7b7] rounded"} />
          <Skeleton className={"w-[150px] h-[200px]  bg-[#b7b7b7] rounded"} />
          <Skeleton className={"w-[200px] h-[200px]  bg-[#b7b7b7] rounded"} />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Red Cross Trainees</CardTitle>
          <CardDescription>Showing total trainees by city</CardDescription>
        </div>
        <div className="flex">
          {["standard", "occupational"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={cities}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="address"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return value;
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
