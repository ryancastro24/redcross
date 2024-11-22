"use client";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export const description = "An interactive bar chart";

const year = new Date().getFullYear();

// Updated chart data based on the data you provided

const chartConfig = {
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  occupational: {
    label: "Occupational",
    color: "hsl(var(--chart-2))",
  },
};

export default function PerMonthChart() {
  const [activeChart, setActiveChart] = React.useState("standard");
  const [permonthData, setPermonthData] = React.useState([]); // Using the provided chart data
  const [popoverVisible, setPopoverVisible] = React.useState(false);
  const [popoverPosition, setPopoverPosition] = React.useState({
    top: 0,
    left: 0,
  });
  const [selectedBarData, setSelectedBarData] = React.useState(null); // Store the clicked bar data
  const [loading, setLoading] = React.useState(true);
  const total = React.useMemo(
    () => ({
      standard: permonthData.reduce((acc, curr) => acc + curr.standard, 0),
      occupational: permonthData.reduce(
        (acc, curr) => acc + curr.occupational,
        0
      ),
    }),
    [permonthData]
  );

  const handleBarClick = (data, e) => {
    const { clientX, clientY } = e; // Get the click position

    // Set the position of the popover and store the selected bar data
    setPopoverPosition({ top: clientY, left: clientX });
    setSelectedBarData(data); // Set the bar data to display
    setPopoverVisible(true); // Show the popover
  };

  React.useEffect(() => {
    async function getPermonthData() {
      try {
        // Fetch data from your API endpoint
        const response = await fetch(
          "http://localhost:3000/api/getDataPermonth"
        ); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json(); // Assuming the API returns JSON data
        // console.log(data); ken
        setPermonthData(data); // Set the state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getPermonthData(); // Call the function inside the useEffect
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="w-full h-72 flex-col  flex mb-16 justify-between px-10">
            <div className="w-full flex justify-between">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-80 h-6 bg-[#b7b7b7]" />
                <Skeleton className="w-80 h-2 bg-[#b7b7b7]" />
              </div>

              <div className="flex items-end gap-2">
                <Skeleton className="w-20 h-20 bg-[#b7b7b7]" />
                <Skeleton className="w-20 h-20 bg-[#b7b7b7]" />
              </div>
            </div>

            <div className="w-full flex justify-between items-end">
              <Skeleton className="w-16 rounded-none h-20 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-40 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-44 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-32 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-24 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-20 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-44 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-32 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-20 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-24 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-24 bg-[#b7b7b7]" />
              <Skeleton className="w-16 rounded-none h-20 bg-[#b7b7b7]" />
            </div>
          </div>
        </>
      ) : (
        <Card className="w-full">
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Number of Trainees per Month</CardTitle>
              <CardDescription>
                Showing total Trainees for the year {year}
              </CardDescription>
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
                      {total[chart].toLocaleString()}
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
                data={permonthData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(`${value}-01`);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey={activeChart}
                      labelFormatter={(value) => {
                        const date = new Date(`${value}-01`);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  onClick={(data, index, e) => handleBarClick(data, e)} // Handle bar click
                  className="cursor-pointer"
                  dataKey={activeChart}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
            {/* Popover for showing bar details */}
            {popoverVisible && (
              <Popover open={popoverVisible} onOpenChange={setPopoverVisible}>
                <PopoverTrigger asChild>
                  {/* Invisible trigger element */}
                  <div
                    style={{
                      position: "absolute",
                      top: popoverPosition.top,
                      left: popoverPosition.left,
                      width: "1px",
                      height: "1px",
                    }}
                  />
                </PopoverTrigger>

                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Trainee Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Details for{" "}
                        {activeChart.charAt(0).toUpperCase() +
                          activeChart.slice(1)}{" "}
                        chart
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label>Male</label>
                        <p className="col-span-2">
                          {activeChart === "standard"
                            ? selectedBarData?.standardGender?.male || "N/A"
                            : selectedBarData?.occupationalGender?.male ||
                              "N/A"}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label>Female</label>
                        <p className="col-span-2">
                          {activeChart === "standard"
                            ? selectedBarData?.standardGender?.female || "N/A"
                            : selectedBarData?.occupationalGender?.female ||
                              "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
