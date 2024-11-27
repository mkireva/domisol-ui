import { Search, Music4 } from "lucide-react";
import { SheetCard } from "./components/SheetCard";
import { getMusicXMLExamples } from "./actions";

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
          {/* Heading Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-slide-up [animation-delay:150ms]">
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text">
                Domisol
              </span>
            </h1>
          </div>

          {/* Search Section */}
          <div className="max-w-3xl mx-auto mt-6 mb-20 px-4 sm:px-6 animate-slide-up [animation-delay:300ms]">
            <div className="relative group">
              {/* Search input container */}
              <div className="relative flex items-center w-full h-14 rounded-full border border-border/40 hover:border-border/60 focus-within:border-primary/50 focus-within:shadow-[0_1px_6px_rgba(32,33,36,.28)] bg-background">
                {/* Search icon */}
                <div className="flex items-center justify-center w-14 h-14">
                  <Search className="h-6 w-6 text-muted-foreground/70" />
                </div>

                {/* Input field */}
                <input
                  type="text"
                  placeholder="Search by title, composer, or category..."
                  className="flex-1 h-full border-0 outline-none bg-transparent text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 px-0"
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">
            {sheets.map((sheet, index) => (
              <div key={sheet.url} className="h-full">
                <SheetCard sheet={sheet} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
