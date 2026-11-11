import { cn } from "@/lib/utils";

/** Small uppercase section label with a leading rule (Covenant Ledger style). */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[0.68rem] font-bold tracking-[0.2em] text-rust uppercase",
        className
      )}
    >
      <span className="h-px w-6 bg-current" aria-hidden="true" />
      {children}
    </div>
  );
}
