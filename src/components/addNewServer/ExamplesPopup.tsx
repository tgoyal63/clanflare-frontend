"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { AlertCircle } from "lucide-react";

// import imageCopylink  from "@/assits/tutorial/copy-link.webp"
import { cn } from "@/utils/cn";
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
          <span className="flex-1">{title}</span>
          <AlertCircle />
        </button>
      </DialogTrigger>
      <DialogContent className="h-screen w-screen max-w-3xl overflow-y-auto rounded-lg bg-card  p-4 md:max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Example</DialogTitle>
        </DialogHeader>

        <div className="overflow-auto">{children}</div>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
