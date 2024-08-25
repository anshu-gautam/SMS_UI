"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import axios from "axios";
import { STUDENTS_CREATE } from "../ApiRoutes";
import { authHelpers } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  email: z.string().email({ message: "Invalid Email" }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  doj: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  grade: z.number().int().positive({ message: "Invalid Grade" }),
  roll_number: z.number().int().positive({ message: "Invalid Roll Number" }),
});

const StudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post(STUDENTS_CREATE, data, {
        headers: {
          Authorization: authHelpers.getAuthToken(),
        },
      });
      toast({
        title: "Student created",
        description: "New Student has been added successfully",
        status: "success",
      });
      router.push("/students");
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            New Student
          </CardTitle>
          <CardDescription className="text-center">
            Enter the details to create a new student account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register("name")}
              />
              {errors.name && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <div className="space-y-2 w-full">
                <Label htmlFor="dob">Date of Birth*</Label>
                <Input
                  id="dob"
                  placeholder="15-03-2005"
                  type="date"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("dob")}
                />
                {errors.dob && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.dob.message}
                  </div>
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="doj">Enrollment Date*</Label>
                <Input
                  id="doj"
                  placeholder="15-03-2015"
                  type="date"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("doj")}
                />
                {errors.doj && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.doj.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="space-y-2 w-full">
                <Label htmlFor="grade">Grade*</Label>
                <Input
                  id="grade"
                  placeholder="7"
                  type="number"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("grade", { valueAsNumber: true })}
                />
                {errors.grade && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.grade.message}
                  </div>
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="roll_number">Roll Number*</Label>
                <Input
                  id="roll_number"
                  placeholder="7"
                  type="number"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("roll_number", { valueAsNumber: true })}
                />
                {errors.roll_number && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.roll_number.message}
                  </div>
                )}
              </div>
            </div>
            <Button
              className="w-full bg-black text-white"
              type="submit"
              disabled={isLoading}
            >
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
