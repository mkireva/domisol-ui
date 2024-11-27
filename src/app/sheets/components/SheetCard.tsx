import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Music4, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryFromName, getComposerDescription, getSheetDescription } from "../utils";

interface SheetCardProps {
  sheet: {
    name: string;
    url: string;
  };
  index: number;
}

export function SheetCard({ sheet, index }: SheetCardProps) {
  const category = getCategoryFromName(sheet.name);

  return (
    <Card
      className={cn(
        "flex flex-col group relative overflow-hidden",
        "hover:shadow-lg transition-all duration-500",
        "animate-in fade-in slide-in-from-bottom duration-1000",
        "bg-card/50 backdrop-blur-sm"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {sheet.name}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {getComposerDescription(sheet.name)}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "ml-2 transition-all duration-300",
              "bg-primary/10 text-primary group-hover:bg-primary/20"
            )}
          >
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow relative">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {getSheetDescription(sheet.name)}
        </p>
      </CardContent>

      <CardFooter className="relative">
        <Button
          asChild
          variant="secondary"
          className="w-full group/button hover:bg-primary/10 transition-all duration-300"
        >
          <Link
            href={`/sheets/viewer?file=${encodeURIComponent(sheet.url)}`}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4 transition-transform group-hover/button:scale-110" />
            <span>Begin Practice</span>
            <Music4 className="h-4 w-4 ml-1 transition-transform group-hover/button:rotate-12" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
