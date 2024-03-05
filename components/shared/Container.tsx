import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface labelLayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export default function Container({ children, ...props }: labelLayoutProps) {
  const { className } = props;
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-8", className)} {...props}>
      {children}
    </div>
  );
}
