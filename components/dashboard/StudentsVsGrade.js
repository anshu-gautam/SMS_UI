"use client";

import { useEffect, useMemo, useState } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  1: {
    label: "1st Grade",
    color: "hsl(var(--chart-1))", // Customize the HSL value
  },
  2: {
    label: "2nd Grade",
    color: "hsl(var(--chart-2))",
  },
  3: {
    label: "3rd Grade",
    color: "hsl(var(--chart-3))",
  },
  4: {
    label: "4th Grade",
    color: "hsl(var(--chart-4))",
  },
  5: {
    label: "5th Grade",
    color: "hsl(var(--chart-5))",
  },
  6: {
    label: "6th Grade",
    color: "hsl(var(--chart-6))",
  },
  7: {
    label: "7th Grade",
    color: "hsl(var(--chart-7))",
  },
  8: {
    label: "8th Grade",
    color: "hsl(var(--chart-8))",
  },
  9: {
    label: "9th Grade",
    color: "hsl(var(--chart-9))",
  },
  10: {
    label: "10th Grade",
    color: "hsl(var(--chart-10))",
  },
  11: {
    label: "11th Grade",
    color: "hsl(var(--chart-11))",
  },
  12: {
    label: "12th Grade",
    color: "hsl(var(--chart-12))",
  },
};

const StudentVsGrade = ({ studentsGroupedByGrade = [] }) => {
  const totalStudents = useMemo(() => {
    return studentsGroupedByGrade.reduce((acc, curr) => acc + curr.count, 0);
  }, [studentsGroupedByGrade]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base font-light">
          Students vs Grade
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              className="bg-white/60 shadow-md backdrop-blur-sm"
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={studentsGroupedByGrade}
              dataKey="count"
              nameKey="_id"
              innerRadius={60}
              strokeWidth={5}
            >
              {studentsGroupedByGrade.map((entry) => (
                <Cell
                  key={entry._id}
                  fill={chartConfig[entry._id]?.color || "#8884d8"}
                />
              ))}
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
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
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
        <div className="leading-none text-muted-foreground font-medium">
          As of {new Date().toDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentVsGrade;
