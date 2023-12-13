import { cn } from "@/lib/utils";

interface SteperProps {
  stepNum: number;
}
export default function Stepper({ stepNum }: SteperProps) {
  return (
    <>
      <div className="mb-4 mt-4 flex w-full items-center">
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": stepNum >= 1,
              },
            )}
          >
            1
          </div>
        </div>
        <div
          className={cn("flex-auto border-t-2  ", {
            "border-primary": stepNum > 1,
          })}
        ></div>
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": stepNum >= 2,
              },
            )}
          >
            2
          </div>
        </div>
        <div
          className={cn("flex-auto border-t-2  ", {
            "border-primary": stepNum > 2,
          })}
        ></div>
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": stepNum >= 3,
              },
            )}
          >
            3
          </div>
        </div>
        <div
          className={cn("flex-auto border-t-2  ", {
            "border-primary": stepNum > 3,
          })}
        ></div>
        <div className="relative flex items-center text-primary">
          <div
            className={cn(
              "h-12 w-12 rounded-full border-2  py-3 text-center ",
              {
                "bg-primary text-primary-foreground": stepNum >= 4,
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
