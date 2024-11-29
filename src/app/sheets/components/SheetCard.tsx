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
  console.log("SheetCard received sheet:", sheet);
  return (
    <Link
      href={`/sheets/viewer?file=${encodeURIComponent(sheet.url)}`}
      prefetch={true}
      className="block w-full h-full"
    >
      <Card
        className={cn(
          "flex flex-col group relative overflow-hidden h-full",
          "hover:shadow-lg transition-all duration-500",
          "animate-in fade-in slide-in-from-bottom duration-1000",
          "bg-card"
        )}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <CardHeader className="relative space-y-4">
          {/* Title and Composer Section */}
          <div className="space-y-3">
            <CardTitle className="text-lg sm:text-xl text-grey-700 font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {sheet.title}
            </CardTitle>

            {/* Composer and Location */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base">
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

            {/* Lyricist */}
            {sheet.lyricist && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base">
                <span className="text-muted-foreground">Lyricist:</span>
                <span className="font-medium">{sheet.lyricist}</span>
              </div>
            )}
          </div>

          {/* Metadata Section */}
          <div className="space-y-3">
            {/* Key Information */}
            <div className="flex items-center gap-2 self-start bg-muted px-3 sm:px-4 py-1.5 rounded-md">
              <div className="text-sm sm:text-base font-medium whitespace-nowrap">
                {sheet.key.tonic} {sheet.key.mode}
              </div>
              <div
                className="w-4 sm:w-5 h-4 sm:h-5 rounded-full ring-1 ring-border shadow-sm flex-shrink-0"
                style={{ backgroundColor: sheet.key.color }}
                title={`Key color: ${sheet.key.color}`}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="capitalize font-medium text-sm sm:text-base px-3 sm:px-4 py-1"
              >
                {sheet.category}
              </Badge>
              {sheet.genre && (
                <Badge
                  variant="secondary"
                  className="capitalize font-medium text-sm sm:text-base px-3 sm:px-4 py-1"
                >
                  {sheet.genre}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="font-medium text-muted-foreground text-sm sm:text-base px-2 sm:px-3 py-1"
              >
                {sheet.year}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="relative">
            <p className="text-base leading-relaxed line-clamp-3 text-muted-foreground">
              {sheet.description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t border-border/50">
          <Button
            variant="outline"
            className="w-full group/button bg-card hover:bg-muted transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2 py-1">
              <Play className="h-4 w-4 transition-transform group-hover/button:scale-110" />
              <span>Open Sheet</span>
            </div>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
