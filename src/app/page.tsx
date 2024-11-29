import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 -z-10 bg-[#f5f5f5] dark:bg-[#1a1a1a] overflow-hidden"
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
                  <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-grey-800 dark:text-gray-100">
                    Music Archive
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
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
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    aria-label="Learn more about Domisol"
                  >
                    Browse sheets
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    aria-label="Learn more about Domisol"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section
              aria-labelledby="features-heading"
              className="mt-20 sm:mt-24 md:mt-32"
            >
              <h2 id="features-heading" className="sr-only">
                Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-1000">
                <article className="p-6 sm:p-8 rounded-3xl bg-card border border-primary/10 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Digital Sheet Music
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                    Access a vast collection of classical music scores in
                    digital format.
                  </p>
                </article>
                <article className="p-6 sm:p-8 rounded-3xl bg-card border border-primary/10 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Interactive Learning
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                    Practice with integrated audio playback and visual guidance.
                  </p>
                </article>
                <article className="p-6 sm:p-8 rounded-3xl bg-card border border-primary/10 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Community Driven
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                    Join a community of musicians sharing and learning together.
                  </p>
                </article>
              </div>
            </section>

            {/* Project Description */}
            <section
              aria-labelledby="discover-heading"
              className="mt-20 sm:mt-24 md:mt-32"
            >
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                  <div className="absolute left-1/4 top-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#f5f5f5] dark:bg-[#1a1a1a] rounded-full blur-3xl animate-float" />
                  <div className="absolute right-1/4 bottom-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#f5f5f5] dark:bg-[#1a1a1a] rounded-full blur-3xl animate-float [animation-delay:2s]" />
                </div>

                <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16">
                  {/* Section Title */}
                  <header className="text-center mb-16 sm:mb-20 animate-in fade-in duration-1000">
                    <h2
                      id="discover-heading"
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary"
                    >
                      Discover Domisol
                    </h2>
                    <p className="mt-6 text-lg sm:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
                      A digital sanctuary for preserving and exploring the rich
                      heritage of occult music exercises, bridging centuries of
                      tradition with modern technology.
                    </p>
                  </header>

                  {/* Content Sections */}
                  <div className="space-y-24 sm:space-y-32 md:space-y-40 animate-in fade-in duration-1000 [animation-delay:200ms]">
                    {/* Mission Section */}
                    <article className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
                      <div className="flex-1 order-2 md:order-1 space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-semibold text-primary">
                          Our Mission
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                          We are dedicated to preserving and sharing the
                          profound wisdom contained within centuries-old music
                          exercises. Our platform serves as a bridge between
                          traditional practices and modern musical education.
                        </p>
                      </div>
                      <div className="flex-1 order-1 md:order-2 w-full">
                        <div className="relative w-full">
                          {/* Minimal frame */}
                          <div className="relative rounded-[2rem] overflow-hidden bg-card/10 backdrop-blur-[2px] group">
                            {/* Subtle border effect */}
                            <div
                              className="absolute inset-0 border border-primary/[0.05] rounded-[2rem]"
                              aria-hidden="true"
                            />

                            {/* Image */}
                            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
                              <Image
                                src="/images/pdanov.png"
                                alt="Vintage photograph of a violinist performing, showcasing traditional musical practices"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={true}
                              />
                              {/* Minimal hover overlay */}
                              <div
                                className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* Collection Section */}
                    <article className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
                      <div className="flex-1 w-full">
                        <div className="relative w-full">
                          {/* Minimal frame */}
                          <div className="relative rounded-[2rem] overflow-hidden bg-card/10 backdrop-blur-[2px] group">
                            {/* Subtle border effect */}
                            <div
                              className="absolute inset-0 border border-primary/[0.05] rounded-[2rem]"
                              aria-hidden="true"
                            />

                            {/* Image */}
                            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
                              <Image
                                src="/images/piano.jpg"
                                alt="Vintage photograph of a piano, highlighting the beauty of classical music"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={true}
                              />
                              {/* Minimal hover overlay */}
                              <div
                                className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-semibold text-primary">
                          Our Collection
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                          Explore our extensive digital archive of rare and
                          historical music sheets, carefully curated and
                          digitized to preserve their authenticity while making
                          them accessible to modern practitioners.
                        </p>
                      </div>
                    </article>

                    {/* Community Section */}
                    <article className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
                      <div className="flex-1 order-2 md:order-1 space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-semibold text-primary">
                          Our Community
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                          Join a vibrant community of musicians, researchers,
                          and enthusiasts. Share knowledge, explore musical
                          spirituality, and contribute to the preservation of
                          this unique musical heritage.
                        </p>
                      </div>
                      <div className="flex-1 order-1 md:order-2 w-full">
                        <div className="relative w-full">
                          {/* Minimal frame */}
                          <div className="relative rounded-[2rem] overflow-hidden bg-card/10 backdrop-blur-[2px] group">
                            {/* Subtle border effect */}
                            <div
                              className="absolute inset-0 border border-primary/[0.05] rounded-[2rem]"
                              aria-hidden="true"
                            />

                            {/* Image */}
                            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
                              <Image
                                src="/images/rila-music.jpeg"
                                alt="Vintage photograph of musicians, highlighting the importance of community in music"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={true}
                              />
                              {/* Minimal hover overlay */}
                              <div
                                className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                aria-hidden="true"
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
