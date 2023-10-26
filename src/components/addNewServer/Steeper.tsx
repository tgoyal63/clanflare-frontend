import { cn } from "@/lib/utils";

interface SteperProps {
  setpNumber: 1 | 2 | 3 | 4;
}
export default function Stepper({ setpNumber }: SteperProps) {
  return (
    <>
      <div className="mb-10 mt-4 flex w-full items-center">
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": setpNumber >= 1,
              },
            )}
          >
            1
          </div>
        </div>
        <div
          className={cn("flex-auto border-t-2  ", {
            "border-primary": setpNumber > 1,
          })}
        ></div>
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": setpNumber >= 2,
              },
            )}
          >
            2
          </div>
        </div>
        <div
          className={cn("flex-auto border-t-2  ", {
            "border-primary": setpNumber > 2,
          })}
        ></div>
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": setpNumber >= 3,
              },
            )}
          >
            3
          </div>
        </div>
        <div
          className={cn("flex-auto border-t-2  ", {
            "border-primary": setpNumber > 3,
          })}
        ></div>
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": setpNumber >= 4,
              },
            )}
          >
            4
          </div>
        </div>
      </div>
    </>
  );
}
