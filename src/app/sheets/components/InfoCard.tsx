import { MusicSheet } from "../actions";
import { SUPPORTED_LANGUAGES } from "../constants";

interface InfoCardProps {
  sheet: MusicSheet | undefined;
  language: string;
}

export function InfoCard({ sheet, language }: InfoCardProps) {
  // Get language name for display
  const languageName =
    SUPPORTED_LANGUAGES.find((l) => l.code === language)?.name || language;

  return (
    <div className="bg-card rounded-lg border border-border shadow-xs">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            Score Information
            <span className="ml-2 text-base font-normal text-foreground/80">
              ({languageName})
            </span>
          </h1>
          <p className="text-base text-foreground/80">
            Detailed information about this musical score
          </p>
        </div>

        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              {/* Title Section */}
              {sheet?.title && (
                <section
                  className="space-y-2"
                  aria-labelledby={`title-heading-${language}`}
                >
                  <h2
                    id={`title-heading-${language}`}
                    className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
                  >
                    Title
                  </h2>
                  <p className="text-lg font-medium">
                    {language === "de"
                      ? sheet.title
                      : language === "en"
                      ? "Silent Night"
                      : language === "es"
                      ? "Noche de Paz"
                      : language === "fr"
                      ? "Douce Nuit"
                      : language === "it"
                      ? "Astro del Ciel"
                      : language === "bg"
                      ? "Тиха нощ"
                      : sheet.title}
                  </p>
                </section>
              )}

              {/* Composer Section */}
              {sheet?.composer && (
                <section
                  className="space-y-2"
                  aria-labelledby={`composer-heading-${language}`}
                >
                  <h2
                    id={`composer-heading-${language}`}
                    className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
                  >
                    Composer
                  </h2>
                  <p className="text-lg">{sheet.composer}</p>
                </section>
              )}

              {/* Location Section */}
              {sheet?.location && (
                <section
                  className="space-y-2"
                  aria-labelledby={`location-heading-${language}`}
                >
                  <h2
                    id={`location-heading-${language}`}
                    className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
                  >
                    Location
                  </h2>
                  <p className="text-lg">{sheet.location}</p>
                </section>
              )}
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {/* Key and Color Section */}
              {sheet?.key && (
                <section
                  className="space-y-2"
                  aria-labelledby={`key-heading-${language}`}
                >
                  <h2
                    id={`key-heading-${language}`}
                    className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
                  >
                    Key and Color
                  </h2>
                  <div className="flex items-center gap-3">
                    <p className="text-lg">
                      {sheet.key.tonic} {sheet.key.mode}
                    </p>
                    {sheet.key.color && (
                      <div
                        className="w-5 h-5 rounded-full border-2 border-border"
                        style={{ backgroundColor: sheet.key.color }}
                        aria-label={`Key color: ${sheet.key.color}`}
                      />
                    )}
                  </div>
                </section>
              )}

              {/* Lyricist Section */}
              {sheet?.lyricist && (
                <section
                  className="space-y-2"
                  aria-labelledby={`lyricist-heading-${language}`}
                >
                  <h2
                    id={`lyricist-heading-${language}`}
                    className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
                  >
                    Lyricist
                  </h2>
                  <p className="text-lg">{sheet.lyricist}</p>
                </section>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              {/* Category Section */}
              {sheet?.category && (
                <section
                  className="space-y-2"
                  aria-labelledby={`category-heading-${language}`}
                >
                  <h2
                    id={`category-heading-${language}`}
                    className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
                  >
                    Category
                  </h2>
                  <p className="text-lg capitalize">{sheet.category}</p>
                </section>
              )}
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {/* Year Section */}
              {sheet?.year && (
                <section
                  className="space-y-2"
                  aria-labelledby={`year-heading-${language}`}
                >
                  <h2
                    id={`year-heading-${language}`}
                    className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
                  >
                    Year
                  </h2>
                  <p className="text-lg">{sheet.year}</p>
                </section>
              )}
            </div>
          </div>

          {/* Description Section - Full Width */}
          {sheet?.description && (
            <section
              className="space-y-2"
              aria-labelledby={`description-heading-${language}`}
            >
              <h2
                id={`description-heading-${language}`}
                className="text-sm font-medium text-foreground/80 uppercase tracking-wide"
              >
                Description
              </h2>
              <p className="text-lg text-grey-900 leading-relaxed">{sheet.description}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
