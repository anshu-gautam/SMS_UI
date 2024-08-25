"use client";

import { Pie, PieChart } from "recharts";

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
import { STUDENTS_BY_AGE } from "../ApiRoutes";
import { authHelpers } from "@/lib/utils";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";

// Function to generate random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StudentsVsAge = () => {
  const [studentsGroupedByAge, setStudentsGroupedByAge] = useState([]);
  const { toast } = useToast();

  const fetchStudentsGroupedByAge = async () => {
    try {
      const { data } = await axios.get(STUDENTS_BY_AGE, {
        headers: {
          Authorization: authHelpers.getAuthToken(),
        },
      });

      const updatedData = data.map((item) => ({
        ...item,
        fill: getRandomColor(),
      }));

      setStudentsGroupedByAge(updatedData);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchStudentsGroupedByAge();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base font-light">Distribution by Age Group</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={studentsGroupedByAge}
              dataKey="count"
              label
              nameKey="_id"
            />
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

export default StudentsVsAge;
