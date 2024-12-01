import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

export function NavButton({ icon: Icon, label, href }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className="rounded-full w-12 h-12 sm:w-10 sm:h-10 hover:bg-[hsl(var(--primary-hover))] hover:text-primary"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon className="h-7 w-7 sm:h-6 sm:w-6" />
        </Link>
      ) : (
        <Icon className="h-7 w-7 sm:h-6 sm:w-6" />
      )}
    </Button>
  );
}
