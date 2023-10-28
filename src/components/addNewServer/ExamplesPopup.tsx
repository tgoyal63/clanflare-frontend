"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AlertCircle } from "lucide-react";

// import imageCopylink  from "@/assits/tutorial/copy-link.webp"
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "../ui/use-toast";

interface props extends ButtonProps {
  title: string;
}

export default function ExampleDialog({ className, title, children }: props) {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "my-4 flex items-center rounded-lg border p-2 px-4  text-left hover:bg-muted",
            className,
          )}
        >
          {/* Give your google sheet access to this email, Click here to learn how ? */}
          {title}
          <AlertCircle />
        </button>
      </DialogTrigger>
      <DialogContent className="h-screen rounded-lg  p-4 md:h-[90%]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {" Make changes to your profile here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-auto">{children}</div>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="secondary" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
