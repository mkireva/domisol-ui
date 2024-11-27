import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Music4, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { MusicSheet } from "../actions";

interface SheetCardProps {
  sheet: MusicSheet;
  index: number;
}

export function SheetCard({ sheet, index }: SheetCardProps) {
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

      <CardHeader className="relative space-y-6">
        <div className="space-y-3">
          <CardTitle className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {sheet.name}
          </CardTitle>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-base">
              <span className="font-medium">{sheet.composer}</span>
              {sheet.location && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {sheet.location}
                  </span>
                </>
              )}
            </div>

            {sheet.lyricist && (
              <div className="flex items-center gap-2 text-base">
                <span className="text-muted-foreground">Lyricist:</span>
                <span className="font-medium">{sheet.lyricist.name}</span>
                {sheet.lyricist.notes && (
                  <div
                    className="text-sm text-muted-foreground/80 italic"
                    title={sheet.lyricist.notes}
                  >
                    <span className="cursor-help">ⓘ</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="capitalize font-medium bg-primary/5 hover:bg-primary/10 transition-colors text-base px-4 py-1.5"
            >
              {sheet.category}
            </Badge>
            <Badge
              variant="outline"
              className="font-medium text-muted-foreground text-base px-3 py-1.5"
            >
              {sheet.year}
            </Badge>
          </div>
          <div className="flex items-center gap-3 bg-muted/30 px-4 py-2 rounded-md">
            <div className="text-base font-medium">
              {sheet.key.tonic} {sheet.key.mode}
            </div>
            <div
              className="w-5 h-5 rounded-full ring-1 ring-border shadow-sm"
              style={{ backgroundColor: sheet.key.color }}
              title={`Key color: ${sheet.key.color}`}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow relative">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Description
          </h3>
          <p className="text-base leading-relaxed line-clamp-3 text-foreground/90">
            {sheet.description}
          </p>
          {sheet.description.length > 250 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
          )}
        </div>
      </CardContent>

      <CardFooter className="relative pt-4">
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
            <span className="font-medium">Begin Practice</span>
            <Music4 className="h-4 w-4 ml-1 transition-transform group-hover/button:rotate-12" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
