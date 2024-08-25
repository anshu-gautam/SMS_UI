import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useState } from "react";
import { STUDENTS_BASE } from "../ApiRoutes";
import { authHelpers } from "@/lib/utils";

const DeleteDialog = ({ student, refetch }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${STUDENTS_BASE}/${student._id}`, {
        headers: {
          Authorization: authHelpers.getAuthToken(),
        },
      });
      setOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen} className="bg-white">
      <AlertDialogTrigger
        className="text-sm pl-2 py-1 w-full text-left"
        onClick={() => setOpen(true)}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-700 text-white text-sm"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
