import { ReactNode } from "react";

export function ImageGrid({ children }: { children: ReactNode }) {
  return (
    <div className="cols-1  grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
