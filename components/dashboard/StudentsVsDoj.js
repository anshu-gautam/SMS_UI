"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { STUDENTS_BY_DOJ } from "../ApiRoutes";
import { authHelpers } from "@/lib/utils";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

const StudentsVsDoj = () => {
  const [studentsGroupedByDoj, setStudentsGroupedByDoj] = useState([]);
  const { toast } = useToast();

  const fetchStudentsGroupedByDoj = async () => {
    try {
      const { data } = await axios.get(STUDENTS_BY_DOJ, {
        headers: {
          Authorization: authHelpers.getAuthToken(),
        },
      });

      setStudentsGroupedByDoj(data);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchStudentsGroupedByDoj();
  }, []);

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle className="text-base font-light">
          New Students Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={studentsGroupedByDoj}
            margin={{
              top: 30,
              left: 40,
              right: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id"
              tickLine={true}
              axisLine={true}
              interval={1}
              tickFormatter={(value) => value.toString()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="count"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={1}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentsVsDoj;
