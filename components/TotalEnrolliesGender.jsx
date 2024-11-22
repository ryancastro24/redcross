"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";
const chartConfig = {
  total: {
    label: "Total",
  },
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
};

export default function TotalEnrolliesGender() {
  const [gender, setGender] = React.useState(null);

  React.useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getGenders");
        const data = await response.json();

        // console.log(data) ken

        setGender(data);
      } catch (error) {
        console.error("Failed to fetch gender data:", error);
      }
    };

    fetchGenders();
  }, []);

  // Ensure the useMemo hook is always called, even if gender is null
  const totalTrainees = React.useMemo(() => {
    return gender ? gender.reduce((acc, curr) => acc + curr.total, 0) : 0;
  }, [gender]);

  if (gender === null) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <Skeleton className={"w-[250px] h-[40px] rounded bg-[#b7b7b7]"} />
          <Skeleton className={"w-[250px] h-[20px] rounded bg-[#b7b7b7]"} />
        </div>
        <Skeleton className={"w-[250px] h-[150px] rounded bg-[#b7b7b7]"} />
        <Skeleton className={"w-[250px] h-[20px] rounded bg-[#b7b7b7]"} />
      </div>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Trainees</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={gender}
              dataKey="total"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTrainees.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Trainees
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total trainees for this year
        </div>
      </CardFooter>
    </Card>
  );
}
