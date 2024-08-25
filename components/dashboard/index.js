"use client";

import { useEffect, useState } from "react";
import StudentsVsDoj from "./StudentsVsDoj";
import StudentVsGrade from "./StudentsVsGrade";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { STUDENTS_BY_GRADES } from "../ApiRoutes";
import { authHelpers } from "@/lib/utils";
import StudentsVsAge from "./StudentsVsAge";

const Dashboard = () => {
  const [studentsGroupedByGrade, setStudentsGroupedByGrade] = useState([]);
  const { toast } = useToast();

  const fetchStudentsGroupedByGrade = async () => {
    try {
      const { data } = await axios.get(STUDENTS_BY_GRADES, {
        headers: {
          Authorization: authHelpers.getAuthToken(),
        },
      });
      setStudentsGroupedByGrade(data);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
      });
    }
  };

  const studentsInHighSchool = studentsGroupedByGrade.reduce((total, group) => {
    if (parseInt(group._id) > 8) {
      return total + group.count;
    }
    return total;
  }, 0);

  const studentsInMiddleSchool = studentsGroupedByGrade.reduce(
    (total, group) => {
      if (parseInt(group._id) > 5 && parseInt(group._id) < 9) {
        return total + group.count;
      }
      return total;
    },
    0
  );

  const studentsInPrimarySchool = studentsGroupedByGrade.reduce(
    (total, group) => {
      if (parseInt(group._id) < 6) {
        return total + group.count;
      }
      return total;
    },
    0
  );

  useEffect(() => {
    fetchStudentsGroupedByGrade();
  }, []);

  return (
    <div className="max-h-screen overflow-y-auto w-full p-10 space-y-2">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-3 gap-5">
        <StudentVsGrade studentsGroupedByGrade={studentsGroupedByGrade} />
        <StudentsVsAge />
        <div className="flex flex-col space-y-4">
          <div className="border rounded-md h-auto px-5 py-6">
            <h3 className="font-light">Students in High School</h3>
            <p className="font-bold text-xl">{studentsInHighSchool}</p>
          </div>
          <div className="border rounded-md h-auto px-5 py-6">
            <h3 className="font-light">Students in Middle School</h3>
            <p className="font-bold text-xl">{studentsInMiddleSchool}</p>
          </div>
          <div className="border rounded-md h-auto px-5 py-6">
            <h3 className="font-light">Students in Primary School</h3>
            <p className="font-bold text-xl">{studentsInPrimarySchool}</p>
          </div>
        </div>
      </div>
      <StudentsVsDoj />
    </div>
  );
};

export default Dashboard;
