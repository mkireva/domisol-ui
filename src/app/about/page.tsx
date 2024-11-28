import { Music4, BookOpen, Users, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl animate-float opacity-70" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl animate-float [animation-delay:2s] opacity-70" />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="relative text-center mb-16 sm:mb-24 animate-in fade-in duration-1000">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent blur-2xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text tracking-tight">
            About Domisol
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Discover the story behind our mission to preserve and share the rich heritage
            of occult music exercises, making centuries of musical wisdom accessible to all.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20 animate-in fade-in duration-1000 [animation-delay:200ms]">
          {[
            {
              icon: Music4,
              title: "Musical Heritage",
              description: "Our collection spans centuries of musical tradition, carefully preserved and digitized to maintain its authenticity."
            },
            {
              icon: BookOpen,
              title: "Digital Library",
              description: "Experience our comprehensive digital library with high-quality scans and interactive scores."
            },
            {
              icon: Users,
              title: "Community",
              description: "Join a vibrant community of musicians and researchers exploring musical spirituality together."
            },
            {
              icon: GraduationCap,
              title: "Education",
              description: "Access comprehensive learning materials with historical context and practical guidance."
            }
          ].map((feature) => (
            <div key={feature.title} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl -z-10 blur-xl group-hover:blur-2xl transition-all" />
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:translate-y-[-2px]">
                <feature.icon className="w-10 h-10 text-primary mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="relative max-w-4xl mx-auto text-center px-4 animate-in fade-in duration-1000 [animation-delay:400ms]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-2xl" />
          </div>
          
          <div className="relative backdrop-blur-sm rounded-3xl border border-primary/10 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-primary">Our Vision</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed sm:text-lg max-w-2xl mx-auto">
              At Domisol, we envision a world where the profound wisdom contained within
              occult music exercises is preserved, studied, and practiced by musicians
              across the globe. Our platform bridges centuries-old traditions with modern practice.
            </p>
            
            <Link
              href="/sheets"
              className="inline-flex items-center justify-center group hover:opacity-90 transition-opacity"
            >
              <span className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10">
                <span className="text-sm font-medium text-primary">
                  Explore Our Collection
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-md -z-10" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}