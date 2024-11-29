import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 -z-10 bg-background dark:bg-background overflow-hidden"
        aria-hidden="true"
      ></div>

      <main className="flex-grow">
        <div className="relative">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16">
            {/* Hero Section */}
            <section
              aria-labelledby="hero-heading"
              className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
            >
              <div
                className="animate-slide-up space-y-6 sm:space-y-8"
                role="presentation"
              >
                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                >
                  <span className="text-primary dark:text-primary">
                    Domisol
                  </span>
                  <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-foreground">
                    Music Archive
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Discover a unique collection of musical wisdom from the past.
                  Our digital archive preserves and shares centuries-old music
                  exercises, making them accessible to modern practitioners.
                </p>
                <div
                  className="flex flex-wrap justify-center gap-4 sm:gap-6"
                  role="navigation"
                  aria-label="Primary"
                >
                  <Link
                    href="/sheets"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 sm:px-8 py-2.5 text-sm sm:text-base font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Browse music sheets"
                  >
                    Browse sheets
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 bg-background/50 backdrop-blur-sm px-6 sm:px-8 py-2.5 text-sm sm:text-base font-medium text-foreground shadow-lg transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
              className="mt-24 sm:mt-32 md:mt-40"
            >
              <h2 id="features-heading" className="sr-only">
                Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in duration-1000">
                <article className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-sm transition-all hover:border-primary/20 hover:shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    Digital Sheet Music
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Access a vast collection of classical music scores in
                    digital format.
                  </p>
                </article>
                <article className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-sm transition-all hover:border-primary/20 hover:shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    Interactive Learning
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Practice with integrated audio playback and visual guidance.
                  </p>
                </article>
                <article className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-sm transition-all hover:border-primary/20 hover:shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    Community Driven
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Join a community of musicians sharing and learning together.
                  </p>
                </article>
              </div>
            </section>

            {/* Project Description */}
            <section
              aria-labelledby="discover-heading"
              className="mt-12 sm:mt-16 md:mt-20"
            >
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                </div>

                <div className="max-w-6xl mx-auto py-6 sm:py-8 md:py-12">
                  {/* Section Title */}
                  <header className="text-center mb-12 sm:mb-16 animate-in fade-in duration-1000">
                    <h2
                      id="discover-heading"
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
                    >
                      Discover Domisol
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      A digital sanctuary for preserving and exploring the rich
                      heritage of occult music exercises, bridging centuries of
                      tradition with modern technology.
                    </p>
                  </header>

                  {/* Content Sections */}
                  <div className="space-y-16 sm:space-y-20 md:space-y-24 animate-in fade-in duration-1000 [animation-delay:200ms]">
                    {/* Mission Section */}
                    <article className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
                      <div className="flex-1 order-2 md:order-1 space-y-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                          Our Mission
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          We are dedicated to preserving and sharing the
                          profound wisdom contained within centuries-old music
                          exercises. Our platform serves as a bridge between
                          traditional practices and modern musical education.
                        </p>
                      </div>
                      <div className="flex-1 order-1 md:order-2 w-full">
                        <div className="relative w-full">
                          {/* Minimal frame */}
                          <div className="relative rounded-2xl overflow-hidden bg-card group">
                            {/* Subtle border effect */}
                            <div
                              className="absolute inset-0 border border-border rounded-2xl"
                              aria-hidden="true"
                            />

                            {/* Image */}
                            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
                              <Image
                                src="/images/pdanov.png"
                                alt="Vintage photograph of a violinist performing, showcasing traditional musical practices"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* Collection Section */}
                    <article className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
                      <div className="flex-1 w-full">
                        <div className="relative w-full">
                          {/* Minimal frame */}
                          <div className="relative rounded-2xl overflow-hidden bg-card group">
                            {/* Subtle border effect */}
                            <div
                              className="absolute inset-0 border border-border rounded-2xl"
                              aria-hidden="true"
                            />

                            {/* Image */}
                            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
                              <Image
                                src="/images/piano.jpg"
                                alt="Vintage photograph of a piano, highlighting the beauty of classical music"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                          Our Collection
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          Explore our extensive digital archive of rare and
                          historical music sheets, carefully curated and
                          digitized to preserve their authenticity while making
                          them accessible to modern practitioners.
                        </p>
                      </div>
                    </article>

                    {/* Community Section */}
                    <article className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
                      <div className="flex-1 order-2 md:order-1 space-y-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                          Our Community
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          Join a vibrant community of musicians, researchers,
                          and enthusiasts. Share knowledge, explore musical
                          spirituality, and contribute to the preservation of
                          this unique musical heritage.
                        </p>
                      </div>
                      <div className="flex-1 order-1 md:order-2 w-full">
                        <div className="relative w-full">
                          {/* Minimal frame */}
                          <div className="relative rounded-2xl overflow-hidden bg-card group">
                            {/* Subtle border effect */}
                            <div
                              className="absolute inset-0 border border-border rounded-2xl"
                              aria-hidden="true"
                            />

                            {/* Image */}
                            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
                              <Image
                                src="/images/rila-music.jpeg"
                                alt="Vintage photograph of musicians, highlighting the importance of community in music"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
