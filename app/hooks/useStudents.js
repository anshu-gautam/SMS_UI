/* eslint-disable no-unused-vars */
import { authHelpers } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useCreateStudents = () => {
const router = useRouter();
  const createStudents = async (variables) => {
    console.log(data);

    const response = await axios.post(
      "/students",
      {
        ...variables,
      },
      {
        headers: {
          "Authorization": authHelpers.getAuthToken(),
        },
      }
    );
    return response.data;
  };
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: createStudents,
    onError: (error) => {
      const message =
        error?.response?.data?.errors[0] || "Failed to create student";
      toast.error(message);
    },
    onSuccess: ({ status }) => {
      toast.success(status);
      router.push("/students/create");
    },
  });

  return { mutate, data, loading: isPending, error };
};

export default useCreateStudents;
