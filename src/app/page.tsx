import { ArrowRight, Music2, BarChart2, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-3rem)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl animate-float animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float [animation-delay:2s] animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl animate-float [animation-delay:4s] animate-pulse-slow" />
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 md:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-block animate-slide-up">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Welcome to the Future of Music Learning
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animate-slide-up [animation-delay:150ms] bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Master Music with{" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text">
                Domisol
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-slide-up [animation-delay:300ms] max-w-2xl mx-auto">
              Transform your musical journey with interactive learning, real-time feedback, and personalized guidance
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up [animation-delay:450ms]">
            <Link href="/sheets">
              <Button size="lg" className="group h-12 px-8 text-base">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/overview">
              <Button size="lg" variant="outline" className="group h-12 px-8 text-base">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 animate-slide-up [animation-delay:600ms]">
            <div className="group relative p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Music2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
                <p className="text-muted-foreground">
                  Experience dynamic music sheets with instant feedback and adaptive learning technology
                </p>
              </div>
            </div>
            
            <div className="group relative p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
                <p className="text-muted-foreground">
                  Track your growth with detailed insights and personalized progress reports
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Learning</h3>
                <p className="text-muted-foreground">
                  Connect with fellow musicians and share your musical journey together
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
                  Revolutionizing Music Education
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Domisol is an innovative platform designed to transform music education through interactive learning experiences. Our platform combines modern technology with traditional music teaching methods to create an engaging and effective learning environment.
                  </p>
                  <p>
                    Whether you are a beginner starting your musical journey or an experienced musician looking to refine your skills, Domisol provides the tools and guidance you need to succeed.
                  </p>
                </div>
                <div className="flex gap-4 items-center pt-4">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Music2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of musicians learning with Domisol
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
