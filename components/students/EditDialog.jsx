import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EditForm from "./EditForm";
import { useState } from "react";

export default function EditDialog({ student, refetch }) {
  const [isOpen, setIsOpen] = useState(false);

  const afterUpdate = () => {
    setIsOpen(false);
    refetch();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        className="text-sm pl-2 py-1 w-full text-left"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Student Information</DialogTitle>
        </DialogHeader>
        <EditForm student={student} afterUpdate={afterUpdate} />
      </DialogContent>
    </Dialog>
  );
}
