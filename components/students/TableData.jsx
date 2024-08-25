import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteAlert";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { STUDENTS_BASE } from "../ApiRoutes";
import { authHelpers } from "@/lib/utils";
import StudentDashboardSkeleton from "../Skelton";
import { Input } from "../ui/input";
import useDebounce from "@/app/hooks/useDebounce";

export default function TableData() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 300);
  const [search, setSearch] = useState(searchParams.get("search") || null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 10);

  const { toast } = useToast();

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(STUDENTS_BASE, {
        headers: {
          Authorization: authHelpers.getAuthToken(),
        },
        params: {
          page,
          limit,
          search,
        },
      });

      setTotal(data.total);
      setStudents(data.students || []);
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

  const updateQueryParam = (key, value) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  const handleNext = () => {
    if (total / limit === page) return;

    setPage((prev) => prev + 1);
    updateQueryParam("page", page + 1);
  };

  const handlePrev = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
    updateQueryParam("page", page - 1);
  };

  useEffect(() => {
    setSearch(debouncedSearchTerm);
    updateQueryParam("search", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <StudentDashboardSkeleton />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Students
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              defaultValue={search}
              type="text"
              placeholder="Search students..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              onChange={handleSearchChange}
            />
          </div>
        </CardTitle>
        <CardDescription>
          Manage your students and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[50vh] overflow-y-auto">
        {students.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-muted-foreground">No students found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Date of Joining</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.roll_number}</TableCell>
                  <TableCell>{new Date(student.dob).toDateString()}</TableCell>
                  <TableCell>{new Date(student.doj).toDateString()}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-label="Open menu"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="h-28 bg-white/10 backdrop-blur-sm"
                        align="end"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditDialog student={student} refetch={fetchStudents} />
                        <DeleteDialog
                          student={student}
                          refetch={fetchStudents}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-muted-foreground">
            Showing {page * limit - limit + 1} to{" "}
            {limit > total ? total : page * limit} of {total} students
          </p>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrev}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
