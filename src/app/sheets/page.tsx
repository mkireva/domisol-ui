import { Search } from "lucide-react";
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
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center -space-y-1 mb-16">
            {/* Heading Section */}
            <div className="text-center">
              <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-bold tracking-tight animate-slide-up [animation-delay:150ms]">
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text">
                  Domisol
                </span>
              </h1>
            </div>

            {/* Search Section */}
            <div className="w-full max-w-[584px] mx-auto animate-slide-up [animation-delay:300ms]">
              <div className="relative group mx-auto">
                <div className="flex items-center w-full h-12 px-4 rounded-full border border-input hover:border-transparent hover:shadow-[0_1px_6px_rgba(32,33,36,.28)] focus-within:border-transparent focus-within:shadow-[0_1px_6px_rgba(32,33,36,.28)] bg-card/95 transition-all duration-200">
                  {/* Search icon */}
                  <Search className="h-5 w-5 text-muted-foreground/70 flex-shrink-0" />

                  {/* Input field */}
                  <input
                    type="text"
                    placeholder="Search sheets..."
                    className="flex-1 h-full border-0 outline-none bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0 px-4"
                  />

                  {/* Keyboard shortcut hint */}
                  <div className="hidden sm:flex items-center space-x-1 pl-2 pr-1 py-1 rounded border border-input/50 bg-muted/30">
                    <kbd className="text-xs text-muted-foreground/70">⌘</kbd>
                    <kbd className="text-xs text-muted-foreground/70">K</kbd>
                  </div>
                </div>

                {/* Dark mode shadow effect */}
                <div className="absolute inset-0 rounded-full dark:shadow-[0_0_0_1px_rgb(255,255,255,0.1)] pointer-events-none transition-all duration-200 dark:group-hover:shadow-[0_1px_6px_rgba(32,33,36,.28)] dark:group-focus-within:shadow-[0_1px_6px_rgba(32,33,36,.28)]" />
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
