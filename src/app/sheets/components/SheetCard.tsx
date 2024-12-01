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
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { MusicSheet } from "../actions";

interface SheetCardProps {
  sheet: MusicSheet;
  index: number;
}

// Metadata components as separate function components for better automatic optimization
function KeyColorInfo({
  tonic,
  mode,
  color,
}: {
  tonic: string;
  mode: string;
  color: string;
}) {
  return (
    <div className="inline-flex items-center gap-4 bg-secondary/50 px-4 py-2 rounded-md text-sm sm:text-base">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Key:</span>
        <span className="font-medium">
          {tonic} {mode}
        </span>
      </div>
      <div
        className="h-4 w-4 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </div>
  );
}

function TagList({
  category,
  genre,
  year,
  location,
}: {
  category: string;
  genre?: string;
  year: number;
  location?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant="secondary"
        className="text-sm sm:text-base bg-primary/10 hover:bg-primary/20"
      >
        {category}
      </Badge>
      {genre && (
        <Badge
          variant="secondary"
          className="text-sm sm:text-base bg-primary/10 hover:bg-primary/20"
        >
          {genre}
        </Badge>
      )}
      {location && (
        <Badge
          variant="secondary"
          className="text-sm sm:text-base bg-primary/10 hover:bg-primary/20"
        >
          {location}
        </Badge>
      )}
      <Badge
        variant="secondary"
        className="text-sm sm:text-base bg-primary/10 hover:bg-primary/20"
      >
        {year}
      </Badge>
    </div>
  );
}

function ComposerInfo({
  composer,
}: {
  composer: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base sm:text-md">
      <span className="text-muted-foreground">Composer:</span>
      <span className="font-medium">{composer}</span>
    </div>
  );
}

function LyricistInfo({ lyricist }: { lyricist?: string }) {
  if (!lyricist) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base sm:text-md">
      <span className="text-muted-foreground">Lyricist:</span>
      <span className="font-medium">{lyricist}</span>
    </div>
  );
}

// Card title component for better isolation
function CardTitleSection({ title }: { title: string }) {
  return (
    <CardTitle className="text-md sm:text-xl text-grey-700 font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-150">
      {title}
    </CardTitle>
  );
}

// Footer button component
function FooterButton() {
  return (
    <Button
      variant="outline"
      className="w-full group/button bg-card hover:bg-muted transition-colors duration-150"
    >
      <div className="flex items-center justify-center gap-2 py-1">
        <Play className="h-4 w-4 transition-transform group-hover/button:scale-110" />
        <span>Open Sheet</span>
      </div>
    </Button>
  );
}

export function SheetCard({ sheet, index }: SheetCardProps) {
  if (process.env.NODE_ENV === "development") {
    console.log("SheetCard received sheet:", sheet);
  }

  return (
    <Link
      href={`/sheets/viewer?file=${encodeURIComponent(sheet.url)}`}
      prefetch={true}
      className="block w-full h-full"
    >
      <Card
        className={cn(
          "flex flex-col group relative overflow-hidden h-full",
          "hover:shadow-lg transition-transform duration-150",
          "animate-in fade-in slide-in-from-bottom duration-300",
          "bg-card"
        )}
        style={{
          animationDelay: `${Math.min(index * 50, 300)}ms`,
        }}
      >
        <CardHeader className="relative space-y-4">
          {/* Title and Metadata Section */}
          <div className="space-y-1.5">
            <CardTitleSection title={sheet.title} />
            <ComposerInfo composer={sheet.composer} />
            <LyricistInfo lyricist={sheet.lyricist} />
          </div>

          {/* Additional Metadata */}
          <div className="space-y-3">
            <KeyColorInfo
              tonic={sheet.key.tonic}
              mode={sheet.key.mode}
              color={sheet.key.color}
            />
            <TagList
              category={sheet.category}
              genre={sheet.genre}
              year={sheet.year}
              location={sheet.location}
            />
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-base sm:text-md leading-relaxed line-clamp-3 text-grey-700">
            {sheet.description}
          </p>
        </CardContent>

        <CardFooter className="pt-3 border-t border-border/50">
          <FooterButton />
        </CardFooter>
      </Card>
    </Link>
  );
}
