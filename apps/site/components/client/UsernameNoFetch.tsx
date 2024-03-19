import Link from "next/link";
import { Typography, cn } from "@/design-system";
import { pluralize } from "@/utils";

export function UsernameNoFetch({
  username,
  className,
  asLink = true,
  activeMemberCount
}: {
  username: string;
  className?: string;
  asLink?: boolean;
  activeMemberCount?: number
}) {
  if (asLink) {
    return (
      <Link
        href={`/${username}`}
        className="hover:underline underline-offset-2 transition-all decoration-secondary-foreground w-fit"
      >
        <Typography className={cn("text-secondary-foreground", className)}>
        {`${username}${activeMemberCount ?  ' + ' + pluralize(activeMemberCount, 'other', 'others') : ''}`}
        </Typography>
      </Link>
    );
  } else {
    return (
      <Typography className={cn("text-secondary-foreground", className)}>
        {`${username}${activeMemberCount ? ' + ' + pluralize(activeMemberCount, 'other', 'others'): ''}`}
      </Typography>
    );
  }
}
