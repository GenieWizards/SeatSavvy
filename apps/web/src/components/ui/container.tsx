import type { BaseComponent } from "@/utils/types";

export const Container = ({ children, className }: BaseComponent) => (
  <div className={`container mx-auto px-1 ${className}`}>{children}</div>
);
