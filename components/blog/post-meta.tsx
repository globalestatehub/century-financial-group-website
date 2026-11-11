import { CalendarDays, FolderOpen, UserRound } from "lucide-react";

/** Date, author, and category line for blog listings and articles. */
export function PostMeta({
  date,
  isoDate,
  author,
  category,
  large = false,
}: {
  date: string;
  isoDate: string;
  author: string;
  category: string;
  large?: boolean;
}) {
  const icon = large ? "h-4 w-4 text-forest" : "h-3.5 w-3.5 text-forest";
  return (
    <div
      className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[#6b746d] ${large ? "mt-6 gap-x-5 text-sm" : "text-xs"}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className={icon} aria-hidden="true" />
        <time dateTime={isoDate}>{date}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <UserRound className={icon} aria-hidden="true" />
        {author}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <FolderOpen className={icon} aria-hidden="true" />
        {category}
      </span>
    </div>
  );
}
