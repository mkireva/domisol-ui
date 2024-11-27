import { ArrowRight, Music2, Sparkles, Moon, Book } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-3rem)] overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl animate-float animate-pulse-slow opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float [animation-delay:2s] animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl animate-float [animation-delay:4s] animate-pulse-slow" />
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 md:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-block animate-slide-up">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Discover the Hidden Harmonies
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-slide-up [animation-delay:150ms] bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Music Exercises with {" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text">
                Domisol
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-slide-up [animation-delay:300ms] max-w-xl mx-auto">
              Journey through ancient musical wisdom and esoteric exercises to unlock your hidden musical potential
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up [animation-delay:450ms]">
            <Link href="/sheets">
              <Button size="lg" className="group h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
                Begin Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/overview">
              <Button size="lg" variant="outline" className="group h-12 px-8 text-base border-primary/20 hover:bg-primary/10">
                Explore the Mysteries
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 animate-slide-up [animation-delay:600ms]">
            <div className="group relative p-6 rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Music2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sacred Harmonies</h3>
                <p className="text-muted-foreground">
                  Master ancient musical exercises rooted in esoteric traditions and mystical wisdom
                </p>
              </div>
            </div>
            
            <div className="group relative p-6 rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mystical Practice</h3>
                <p className="text-muted-foreground">
                  Interactive exercises designed to awaken your inner musical consciousness
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ancient Wisdom</h3>
                <p className="text-muted-foreground">
                  Access a curated collection of occult musical knowledge and sacred compositions
                </p>
              </div>
            </div>
          </div>

          {/* Project Description Section */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
            <div className="grid md:grid-cols-2 gap-12 items-center animate-slide-up [animation-delay:750ms]">
              <div className="text-left space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  Unlock the Secrets of Occult Music
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our platform is dedicated to providing a comprehensive and immersive experience for those seeking to explore the mysteries of occult music. With a vast library of ancient musical wisdom and esoteric exercises, you'll be able to unlock your hidden musical potential and tap into the secrets of the universe.
                  </p>
                  <p>
                    Whether you're a seasoned musician or just starting your journey, our platform is designed to guide you through the mystical realms of sound and silence. Join our community of like-minded individuals and embark on a transformative journey that will awaken your inner musical consciousness.
                  </p>
                </div>
                <div className="flex gap-4 items-center pt-4">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Moon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Book className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join the mystical journey and unlock the secrets of occult music
                  </p>
                </div>
              </div>
              <div className="relative aspect-square md:aspect-video w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/0 to-primary/10 rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl border backdrop-blur-[2px] p-2">
                  <div className="w-full h-full rounded-xl border bg-card/50 p-4">
                    <div className="h-2 w-24 bg-primary/20 rounded-full mb-3" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-muted rounded-full" />
                      <div className="h-2 w-4/5 bg-muted rounded-full" />
                      <div className="h-2 w-2/3 bg-muted rounded-full" />
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <div className="h-12 rounded bg-muted" />
                      <div className="h-12 rounded bg-primary/10" />
                      <div className="h-12 rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
