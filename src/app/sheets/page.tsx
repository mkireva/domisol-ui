import { Search } from "lucide-react";
import { SheetCard } from "./components/SheetCard";
import { getMusicXMLExamples } from "./actions";

export default async function Sheet() {
  const sheets = await getMusicXMLExamples();
  console.log("Page received sheets:", sheets);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 -z-10 bg-background dark:bg-background overflow-hidden"
        aria-hidden="true"
      ></div>
      <div className="relative min-h-screen flex flex-col">
        {/* Hero Section with Search */}
        <section className="pt-[12vh] sm:pt-[15vh] md:pt-[20vh] pb-4 sm:pb-6 md:pb-8">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <div className="flex flex-col items-center">
              {/* Heading Section */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <h1 className="text-[2.75rem] sm:text-[2.75rem] md:text-[4.5rem] lg:text-[5rem] font-bold tracking-tight animate-slide-up [animation-delay:150ms]">
                  <span className="text-primary">Domisol</span>
                </h1>
              </div>

              {/* Search Section */}
              <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[584px] mx-auto animate-slide-up [animation-delay:300ms]">
                <div className="relative group mx-auto">
                  <div className="flex items-center w-full h-9 sm:h-10 md:h-12 px-2.5 sm:px-3 md:px-4 rounded-full border border-input hover:border-transparent hover:shadow-[0_1px_6px_rgba(32,33,36,.28)] focus-within:border-transparent focus-within:shadow-[0_1px_6px_rgba(32,33,36,.28)] bg-card/95 transition-all duration-200">
                    {/* Search icon */}
                    <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />

                    {/* Input field */}
                    <input
                      type="text"
                      placeholder="Search sheets..."
                      className="flex-1 h-full border-0 outline-none bg-transparent text-xs sm:text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 px-2 sm:px-3 md:px-4"
                    />

                    {/* Keyboard shortcut hint */}
                    <div className="hidden sm:flex items-center space-x-1 pl-2 pr-1 py-0.5 sm:py-1 rounded border border-input bg-muted/50">
                      <kbd className="text-[10px] sm:text-xs text-muted-foreground">⌘</kbd>
                      <kbd className="text-[10px] sm:text-xs text-muted-foreground">K</kbd>
                    </div>
                  </div>

                  {/* Dark mode shadow effect */}
                  <div className="absolute inset-0 rounded-full dark:shadow-[0_0_0_1px_rgb(255,255,255,0.1)] pointer-events-none transition-all duration-200 dark:group-hover:shadow-[0_1px_6px_rgba(32,33,36,.28)] dark:group-focus-within:shadow-[0_1px_6px_rgba(32,33,36,.28)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Grid Section */}
        <section className="py-3 sm:py-4 md:py-6 bg-muted/30">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 animate-in fade-in duration-1000">
              {sheets.map((sheet, index) => (
                <div key={sheet.url} className="h-full">
                  <SheetCard sheet={sheet} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
