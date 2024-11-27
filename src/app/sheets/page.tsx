import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getMusicXMLExamples } from "./actions";
import { Music4, Sparkles, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function Sheet() {
  const sheets = await getMusicXMLExamples();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl animate-float animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float [animation-delay:2s] animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl animate-float [animation-delay:4s] animate-pulse-slow" />
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          {/* Hero Section */}
          <div className="relative mb-24">
            <div className="relative text-center space-y-8">
              <div className="space-y-2">
                <div className="inline-block animate-slide-up">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                    Music Collection
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-slide-up [animation-delay:150ms] bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Explore Our{" "}
                  <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text">
                    Sheet Music
                  </span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up [animation-delay:300ms]">
                  Discover our curated collection of occultic music exercises and scores.
                </p>
              </div>

              <div className="flex justify-center gap-4 animate-slide-up [animation-delay:450ms]">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 group"
                >
                  <Link
                    href="/sheets/viewer"
                    className="flex items-center gap-2"
                  >
                    <Music4 className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>Open Sheet Viewer</span>
                    <Sparkles className="h-4 w-4 ml-1 transition-transform group-hover:rotate-12" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">
            {sheets.map((sheet, index) => {
              const category = getCategoryFromName(sheet.name);
              return (
                <Card
                  key={sheet.url}
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
                        href={`/sheets/viewer?file=${encodeURIComponent(
                          sheet.url
                        )}`}
                        className="flex items-center gap-2"
                      >
                        <Play className="h-4 w-4 transition-transform group-hover/button:scale-110" />
                        <span>View Sheet</span>
                        <Music4 className="h-4 w-4 ml-1 transition-transform group-hover/button:rotate-12" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryFromName(name: string): string {
  if (
    name.toLowerCase().includes("osmd") ||
    name.toLowerCase().includes("test")
  ) {
    return "Technical";
  }
  if (name.includes("Bach")) {
    return "Baroque";
  }
  if (name.includes("Beethoven") || name.includes("Schubert")) {
    return "Romantic";
  }
  return "Classical";
}

function getComposerDescription(name: string): string {
  const composerMap: { [key: string]: string } = {
    "Muzio Clementi": "Italian Classical composer (1752-1832)",
    "Johann Sebastian Bach": "German Baroque composer (1685-1750)",
    Mozart: "Austrian Classical composer (1756-1791)",
    Beethoven: "German Classical/Romantic composer (1770-1827)",
    Schubert: "Austrian Classical/Romantic composer (1797-1828)",
    Haydn: "Austrian Classical composer (1732-1809)",
    Debussy: "French Impressionist composer (1862-1918)",
  };

  for (const [composer, description] of Object.entries(composerMap)) {
    if (name.includes(composer)) {
      return description;
    }
  }

  return "Technical demonstration score";
}

function getSheetDescription(name: string): string {
  const descriptionMap: { [key: string]: string } = {
    "Muzio Clementi - Sonatina":
      "A popular teaching piece that combines melodic charm with technical challenges. Perfect for intermediate pianists.",
    "Johann Sebastian Bach - Air":
      "From Orchestral Suite No. 3 in D major, this piece is known for its graceful melody and emotional depth.",
    "Mozart - Eine Kleine Nachtmusik":
      "One of Mozart's most popular works, this serenade is known for its lively and cheerful character.",
    "Beethoven - Moonlight Sonata":
      "A deeply emotional and technically challenging piece that showcases Beethoven's romantic style.",
    "Schubert - An Die Musik":
      "A beautiful art song (Lied) that pays tribute to the art of music itself.",
    "Test Score - OSMD":
      "A technical demonstration score showcasing various musical notation features.",
    "Haydn - Piano Sonata":
      "A delightful example of Classical period piano writing, full of wit and charm.",
    "Debussy - Mandoline":
      "An impressionistic art song inspired by Paul Verlaine's poetry.",
    "OSMD - Chord Test":
      "A technical score demonstrating various chord notation features.",
    "OSMD - Rhythm Test":
      "A technical score showcasing different rhythm and drum notation patterns.",
  };

  for (const [key, description] of Object.entries(descriptionMap)) {
    if (name.includes(key)) {
      return description;
    }
  }

  return "A demonstration score for testing musical notation features.";
}
