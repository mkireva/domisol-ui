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
import { Play, FileMusic } from "lucide-react";
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
    <div className="inline-flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-full text-sm backdrop-blur-xs shadow-xs">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium">Key:</span>
        <span className="font-semibold tracking-wide">
          {tonic} {mode}
        </span>
      </div>
      <div
        className="h-4 w-4 rounded-full ring-1 ring-white/30"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}80`,
        }}
      />
    </div>
  );
}

function TagBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="secondary"
      className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/40 hover:bg-secondary/50 transition-colors shadow-xs"
    >
      {children}
    </Badge>
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
    <div className="flex flex-wrap items-center gap-1">
      <TagBadge>{category}</TagBadge>
      {genre && <TagBadge>{genre}</TagBadge>}
      {location && <TagBadge>{location}</TagBadge>}
      <TagBadge>{year}</TagBadge>
    </div>
  );
}

function MetadataItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-x-2 text-sm">
      <span className="text-muted-foreground/90 font-medium">{label}:</span>
      <span className="font-semibold text-foreground/90">{value}</span>
    </div>
  );
}

function ComposerInfo({ composer }: { composer: string }) {
  return <MetadataItem label="Composer" value={composer} />;
}

function LyricistInfo({ lyricist }: { lyricist?: string }) {
  return <MetadataItem label="Lyricist" value={lyricist} />;
}

// Card title component for better isolation
function CardTitleSection({ title }: { title: string }) {
  return (
    <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors duration-200 tracking-tight">
      {title}
    </CardTitle>
  );
}

// Footer button component
function FooterButton() {
  return (
    <Button
      variant="default"
      className="w-full group/button bg-primary/90 hover:bg-primary transition-all duration-300 shadow-md"
    >
      <div className="flex items-center justify-center gap-2.5 py-1">
        <Play className="h-4.5 w-4.5 transition-transform group-hover/button:translate-x-0.5" />
        <span className="font-semibold tracking-wide">View Sheet</span>
      </div>
    </Button>
  );
}

export function SheetCard({ sheet, index }: SheetCardProps) {
  return (
    <Link
      href={`/sheets/viewer?file=${encodeURIComponent(sheet.url)}`}
      prefetch={true}
      className="block w-full h-full"
    >
      <Card
        className={cn(
          "flex flex-col group relative overflow-hidden h-full",
          "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
          "animate-in fade-in slide-in-from-bottom duration-300",
          "bg-card border border-border/40",
          "backdrop-blur-xs"
        )}
        style={{
          animationDelay: `${Math.min(index * 40, 250)}ms`,
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-90"
          style={{ backgroundColor: sheet.key.color }}
        />
        
        {/* Sheet music icon */}
        <div className="absolute top-4 right-4 text-muted-foreground/60 group-hover:text-primary/60 transition-colors duration-300">
          <FileMusic className="h-6 w-6" />
        </div>

        <CardHeader className="relative space-y-4 pb-4 pt-5 px-5">
          <div className="space-y-2">
            <CardTitleSection title={sheet.title} />
            <div className="space-y-1 mt-1">
              <ComposerInfo composer={sheet.composer} />
              <LyricistInfo lyricist={sheet.lyricist} />
            </div>
          </div>

          <div className="space-y-3 pt-1">
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

        <CardContent className="grow px-5 pb-3">
          <p className="text-sm leading-relaxed line-clamp-2 text-muted-foreground/90">
            {sheet.description}
          </p>
        </CardContent>

        <CardFooter className="pt-4 pb-5 px-5 border-t border-border/30">
          <FooterButton />
        </CardFooter>
      </Card>
    </Link>
  );
}
