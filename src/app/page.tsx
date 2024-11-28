import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl animate-float animate-pulse-slow" />
      </div>

      <div className="flex-grow">
        <div className="relative">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-slide-up [animation-delay:150ms]">
                  <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text">
                    Domisol
                  </span>
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-slide-up [animation-delay:200ms]">
                  Explore the secrets of occult music exercises through our
                  curated collection of music sheets and audio examples.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up [animation-delay:300ms]">
                  <Link
                    href="/sheets"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-primary/90 transition-colors"
                  >
                    Browse Sheets
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex-1 relative animate-slide-up [animation-delay:400ms]">
                <div className="relative aspect-[4/3] max-w-xl mx-auto">
                  {/* Background effects */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-2xl rounded-[2rem] animate-pulse-slow" />
                  <div className="absolute -inset-4 bg-gradient-to-l from-primary/10 via-primary/5 to-transparent blur-2xl rounded-[2rem] animate-pulse-slow [animation-delay:1s]" />

                  {/* Frame container */}
                  <div className="relative rounded-[2rem] overflow-hidden bg-card/30 backdrop-blur-sm border border-primary/10 p-4 hover:border-primary/20 transition-all duration-500">
                    {/* Decorative corner elements */}
                    <div className="absolute -left-3 -top-3 w-6 h-6 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
                    <div className="absolute -right-3 -top-3 w-6 h-6 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
                    <div className="absolute -left-3 -bottom-3 w-6 h-6 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
                    <div className="absolute -right-3 -bottom-3 w-6 h-6 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />

                    {/* Glow effects */}
                    <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

                    {/* Image container */}
                    <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                      <Image
                        src="/images/pdanov.png"
                        alt="Vintage photograph of a violinist performing"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-1000">
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-2">
                  Digital Sheet Music
                </h2>
                <p className="text-muted-foreground">
                  Access a vast collection of classical music scores in digital
                  format.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-2">
                  Interactive Learning
                </h2>
                <p className="text-muted-foreground">
                  Practice with integrated audio playback and visual guidance.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-2">Community Driven</h2>
                <p className="text-muted-foreground">
                  Join a community of musicians sharing and learning together.
                </p>
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-24">
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
                  <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float [animation-delay:2s]" />
                </div>

                <div className="max-w-5xl mx-auto px-6 py-16">
                  {/* Section Title */}
                  <div className="text-center mb-16 animate-in fade-in duration-1000">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-transparent bg-clip-text inline-block">
                      Discover Domisol
                    </h2>
                    <div className="mt-6 max-w-2xl mx-auto">
                      <p className="text-lg text-muted-foreground">
                        A digital sanctuary for preserving and exploring the
                        rich heritage of occult music exercises, bridging
                        centuries of tradition with modern technology.
                      </p>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-32 animate-in fade-in duration-1000 [animation-delay:200ms]">
                    {/* Mission Section */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="flex-1 order-2 md:order-1">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                          Our Mission
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We are dedicated to preserving and sharing the
                          profound wisdom contained within centuries-old music
                          exercises. Our platform serves as a bridge between
                          traditional practices and modern musical education.
                        </p>
                      </div>
                      <div className="flex-1 order-1 md:order-2">
                        <div className="relative">
                          {/* Minimal frame */}
                          <div className="relative rounded-[2rem] overflow-hidden bg-card/10 backdrop-blur-[2px] group">
                            {/* Subtle border effect */}
                            <div className="absolute inset-0 border border-primary/[0.05] rounded-[2rem]" />

                            {/* Image */}
                            <div className="relative aspect-[4/3]">
                              <Image
                                src="/images/music.jpeg"
                                alt="Vintage photograph of a violinist performing"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                priority
                              />
                              {/* Minimal hover overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Collection Section */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="flex-1">
                        <div className="relative">
                          {/* Minimal frame */}
                          <div className="relative rounded-[2rem] overflow-hidden bg-card/10 backdrop-blur-[2px] group">
                            {/* Subtle border effect */}
                            <div className="absolute inset-0 border border-primary/[0.05] rounded-[2rem]" />

                            {/* Image */}
                            <div className="relative aspect-[4/3]">
                              <Image
                                src="/images/piano.jpg"
                                alt="Vintage photograph of a violinist performing"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                priority
                              />
                              {/* Minimal hover overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                          Our Collection
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Explore our extensive digital archive of rare and
                          historical music sheets, carefully curated and
                          digitized to preserve their authenticity while making
                          them accessible to modern practitioners.
                        </p>
                      </div>
                    </div>

                    {/* Community Section */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="flex-1 order-2 md:order-1">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                          Our Community
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Join a vibrant community of musicians, researchers,
                          and enthusiasts. Share knowledge, explore musical
                          spirituality, and contribute to the preservation of
                          this unique musical heritage.
                        </p>
                      </div>
                      <div className="flex-1 order-1 md:order-2">
                        <div className="relative">
                          {/* Minimal frame */}
                          <div className="relative rounded-[2rem] overflow-hidden bg-card/10 backdrop-blur-[2px] group">
                            {/* Subtle border effect */}
                            <div className="absolute inset-0 border border-primary/[0.05] rounded-[2rem]" />

                            {/* Image */}
                            <div className="relative aspect-[4/3]">
                              <Image
                                src="/images/rila-music.jpeg"
                                alt="Vintage photograph of a violinist performing"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                                priority
                              />
                              {/* Minimal hover overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </div>
                        </div>
                      </div>
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
