import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Music, BookOpen, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Background Elements */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/90 dark:from-background dark:via-background/95 dark:to-background/80"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      </div>

      <main className="grow flex flex-col justify-start pt-20 sm:pt-24 md:pt-28">
        <div className="relative w-full">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            {/* Hero Section */}
            <section
              aria-labelledby="hero-heading"
              className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-12 sm:py-16 md:py-20"
            >
              <div 
                className="space-y-10 px-2 sm:px-4 animate-fade-in" 
                role="presentation"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-30 dark:opacity-40"></div>
                  <h1
                    id="hero-heading"
                    className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90"
                  >
                    Domisol
                    <span className="block mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground dark:text-foreground">
                      Music Sheet Collection
                    </span>
                  </h1>
                </div>
                
                <p 
                  className="text-base sm:text-lg md:text-xl text-foreground/80 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0 animate-fade-in-delayed"
                >
                  Discover a unique collection of occult music exercises. Our
                  digital archive preserves and shares occult music exercises,
                  making them accessible to modern practitioners.
                </p>
                
                <div
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full px-4 sm:px-0 animate-fade-in-delayed-more"
                  role="navigation"
                  aria-label="Primary"
                >
                  <Link
                    href="/sheets"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 sm:px-8 sm:py-3 text-base font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:translate-y-[-2px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Browse music sheets"
                  >
                    Browse sheets
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-background/80 backdrop-blur-sm px-7 py-3.5 sm:px-8 sm:py-3 text-base font-medium text-foreground shadow-sm transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:shadow-md hover:translate-y-[-2px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Learn about Domisol"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section
              aria-labelledby="features-heading"
              className="mt-16 sm:mt-24 px-4 sm:px-0"
            >
              <div className="animate-fade-in-delayed-most">
                <h2 id="features-heading" className="sr-only">
                  Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                  <article 
                    className="relative p-6 sm:p-8 rounded-2xl bg-card/80 border border-border shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 animate-fade-up"
                  >
                    <div className="absolute top-6 right-6 p-2 rounded-full bg-primary/10 text-primary">
                      <Music className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      Digital Sheet Music
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Access a vast collection of classical music scores in
                      digital format, carefully preserved and optimized for modern devices.
                    </p>
                  </article>
                  <article 
                    className="relative p-6 sm:p-8 rounded-2xl bg-card/80 border border-border shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 animate-fade-up-delayed"
                  >
                    <div className="absolute top-6 right-6 p-2 rounded-full bg-primary/10 text-primary">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      Interactive Learning
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Practice with integrated audio playback and visual guidance,
                      enhancing your musical journey with modern tools.
                    </p>
                  </article>
                  <article 
                    className="relative p-6 sm:p-8 rounded-2xl bg-card/80 border border-border shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 animate-fade-up-delayed-more"
                  >
                    <div className="absolute top-6 right-6 p-2 rounded-full bg-primary/10 text-primary">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      Community Driven
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Join a vibrant community of musicians sharing knowledge and
                      experiences, preserving this unique musical heritage together.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            {/* Project Description */}
            <div className="mt-24 sm:mt-32 md:mt-40">
              <div className="relative w-screen left-[50%] right-[50%] mx-[-50vw] bg-gradient-to-b from-background via-gray-100/50 to-gray-100 dark:from-background dark:via-gray-900/20 dark:to-gray-900/40">
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] opacity-5"></div>
                <section
                  aria-labelledby="discover-heading"
                  className="relative py-16 sm:py-20 md:py-24"
                >
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                      {/* Section Title */}
                      <header 
                        className="text-center mb-12 sm:mb-20 animate-fade-in"
                      >
                        <div className="inline-block">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-30 dark:opacity-40"></div>
                            <h2
                              id="discover-heading"
                              className="relative text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90"
                            >
                              Discover Domisol
                            </h2>
                          </div>
                        </div>
                        <p className="mt-6 text-base sm:text-lg md:text-xl text-foreground/80 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                          A digital sanctuary for preserving and exploring the
                          rich heritage of occult music exercises, bridging
                          centuries of tradition with modern technology.
                        </p>
                      </header>

                      {/* Content Sections */}
                      <div className="space-y-20 sm:space-y-28 md:space-y-36">
                        {/* Mission Section */}
                        <article 
                          className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16 animate-fade-in"
                        >
                          <div 
                            className="flex-1 order-2 md:order-1 space-y-4 animate-slide-in-right"
                          >
                            <h3 className="text-2xl sm:text-3xl font-semibold text-primary">
                              Our Mission
                            </h3>
                            <p className="text-base sm:text-lg text-foreground/80 dark:text-muted-foreground leading-relaxed">
                              We are dedicated to preserving and sharing the
                              profound wisdom contained within centuries-old
                              music exercises. Our platform serves as a bridge
                              between traditional practices and modern musical
                              education.
                            </p>
                          </div>
                          <div 
                            className="flex-1 order-1 md:order-2 w-full animate-slide-in-left"
                          >
                            <div className="relative w-full">
                              {/* Elegant frame with shadow */}
                              <div className="relative rounded-2xl overflow-hidden bg-card group transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-xl">
                                {/* Subtle glow effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
                                
                                {/* Subtle border effect */}
                                <div
                                  className="absolute inset-0 border border-border rounded-2xl group-hover:border-primary/30 transition-colors duration-500"
                                  aria-hidden="true"
                                />

                                {/* Image */}
                                <div
                                  className="relative w-full aspect-4/3"
                                >
                                  <Image
                                    src="/images/pdanov.png"
                                    alt="Petar Danov playing the violin"
                                    className="object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={true}
                                    loading="eager"
                                    quality={85}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>

                        {/* Collection Section */}
                        <article 
                          className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16 animate-fade-in"
                        >
                          <div 
                            className="flex-1 w-full order-1 animate-slide-in-right"
                          >
                            <div className="relative w-full">
                              {/* Elegant frame with shadow */}
                              <div className="relative rounded-2xl overflow-hidden bg-card group transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-xl">
                                {/* Subtle glow effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
                                
                                {/* Subtle border effect */}
                                <div
                                  className="absolute inset-0 border border-border rounded-2xl group-hover:border-primary/30 transition-colors duration-500"
                                  aria-hidden="true"
                                />

                                {/* Image */}
                                <div
                                  className="relative w-full aspect-4/3"
                                >
                                  <Image
                                    src="/images/piano.jpg"
                                    alt="Vintage photograph of a piano, highlighting the beauty of classical music"
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={true}
                                    loading="eager"
                                    quality={85}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div 
                            className="flex-1 order-2 space-y-4 animate-slide-in-left"
                          >
                            <h3 className="text-2xl sm:text-3xl font-semibold text-primary">
                              Our Collection
                            </h3>
                            <p className="text-base sm:text-lg text-foreground/80 dark:text-muted-foreground leading-relaxed">
                              Explore our extensive digital archive of rare and
                              historical music sheets, carefully curated and
                              digitized to preserve their authenticity while
                              making them accessible to modern practitioners.
                            </p>
                          </div>
                        </article>

                        {/* Community Section */}
                        <article 
                          className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16 animate-fade-in"
                        >
                          <div 
                            className="flex-1 order-2 md:order-1 space-y-4 animate-slide-in-right"
                          >
                            <h3 className="text-2xl sm:text-3xl font-semibold text-primary">
                              Our Community
                            </h3>
                            <p className="text-base sm:text-lg text-foreground/80 dark:text-muted-foreground leading-relaxed">
                              Join a vibrant community of musicians,
                              researchers, and enthusiasts. Share knowledge,
                              explore musical spirituality, and contribute to
                              the preservation of this unique musical heritage.
                            </p>
                          </div>
                          <div 
                            className="flex-1 order-1 md:order-2 w-full animate-slide-in-left"
                          >
                            <div className="relative w-full">
                              {/* Elegant frame with shadow */}
                              <div className="relative rounded-2xl overflow-hidden bg-card group transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-xl">
                                {/* Subtle glow effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
                                
                                {/* Subtle border effect */}
                                <div
                                  className="absolute inset-0 border border-border rounded-2xl group-hover:border-primary/30 transition-colors duration-500"
                                  aria-hidden="true"
                                />

                                {/* Image */}
                                <div
                                  className="relative w-full aspect-4/3"
                                >
                                  <Image
                                    src="/images/rila-music.jpeg"
                                    alt="Vintage photograph of musicians, highlighting the importance of community in music"
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={true}
                                    loading="eager"
                                    quality={85}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                      
                      {/* Call to Action */}
                      <div 
                        className="mt-20 sm:mt-28 text-center animate-fade-in"
                      >
                        <div className="relative inline-block">
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-30 dark:opacity-40"></div>
                          <Link
                            href="/sheets"
                            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:translate-y-[-2px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            aria-label="Explore our collection"
                          >
                            Explore Our Collection
                            <ArrowRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
