import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMusicXMLExamples } from "./actions";
import { Music4, Sparkles } from "lucide-react";
import { SheetCard } from "./components/SheetCard";

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
            <div className="relative text-center space-y-6">
              <div className="space-y-1.5">
                <div className="inline-block animate-slide-up">
                  <span className="inline-flex items-center px-3 py-0.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
                    Sacred Collection
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight animate-slide-up [animation-delay:150ms] bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Explore Our{" "}
                  <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text">
                    Music Scores
                  </span>
                </h1>
                <p className="mt-2 text-lg leading-snug text-muted-foreground max-w-xl mx-auto animate-slide-up [animation-delay:300ms]">
                  Discover our curated collection of occult music exercises and
                  spiritual practices.
                </p>
              </div>

              <div className="flex justify-center gap-4 animate-slide-up [animation-delay:450ms]">
                <Button asChild size="lg" className="h-12 px-8 group">
                  <Link
                    href="/sheets/viewer"
                    className="flex items-center gap-2"
                  >
                    <Music4 className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>Begin Your Practice</span>
                    <Sparkles className="h-4 w-4 ml-1 transition-transform group-hover:rotate-12" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">
            {sheets.map((sheet, index) => (
              <SheetCard key={sheet.url} sheet={sheet} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
