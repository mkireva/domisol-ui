"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicSheetDisplay from "./MusicSheetDisplay";
import {
  Info,
  Globe2,
  Mic,
  Piano,
  PlayCircle,
  FileText,
  ArrowLeft,
  ListMusic,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MusicSheet } from "./actions";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./audio-player.css";
import { useRouter } from "next/navigation";

interface SheetViewerProps {
  sheets: MusicSheet[];
  initialSheetUrl?: string;
  selectedSheet?: MusicSheet;
}

const SUPPORTED_LANGUAGES = [
  { code: "bg", name: "Bulgarian" },
  { code: "de", name: "German" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
];

const TabIcon = ({
  icon: Icon,
  isSelected,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  isSelected: boolean;
}) => (
  <div className={`w-6 h-6 ${isSelected ? "text-foreground" : ""}`}>
    <Icon size={24} className="w-full h-full" />
  </div>
);

const tabs = [
  {
    id: "back",
    label: "",
    icon: ArrowLeft,
  },
  {
    id: "sheet",
    label: "Viewer",
    icon: ListMusic,
  },
  {
    id: "lyrics",
    label: "Lyrics",
    icon: FileText,
  },
  {
    id: "player",
    label: "Player",
    icon: PlayCircle,
  },
  {
    id: "info",
    label: "Info",
    icon: Info,
  },
];

const InfoCard = ({
  sheet,
  language,
}: {
  sheet: MusicSheet | undefined;
  language: string;
}) => {
  // Get language name for display
  const languageName =
    SUPPORTED_LANGUAGES.find((l) => l.code === language)?.name || language;

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Score Information
            <span className="ml-2 text-base font-normal text-muted-foreground">
              ({languageName})
            </span>
          </h2>
          <p className="text-base text-muted-foreground">
            Detailed information about this musical score
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              {/* Title Section */}
              {sheet?.name && (
                <section
                  className="space-y-2"
                  aria-labelledby={`title-heading-${language}`}
                >
                  <h3
                    id={`title-heading-${language}`}
                    className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Title
                  </h3>
                  <p className="text-lg font-medium">
                    {language === "de"
                      ? sheet.name
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
                      : sheet.name}
                  </p>
                </section>
              )}

              {/* Composer Section */}
              {sheet?.composer && (
                <section
                  className="space-y-2"
                  aria-labelledby={`composer-heading-${language}`}
                >
                  <h3
                    id={`composer-heading-${language}`}
                    className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Composer
                  </h3>
                  <p className="text-lg">{sheet.composer}</p>
                </section>
              )}

              {/* Location Section */}
              {sheet?.location && (
                <section
                  className="space-y-2"
                  aria-labelledby={`location-heading-${language}`}
                >
                  <h3
                    id={`location-heading-${language}`}
                    className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Location
                  </h3>
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
                  <h3
                    id={`key-heading-${language}`}
                    className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Key and Color
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-lg">
                      {sheet.key.tonic} {sheet.key.mode}
                    </p>
                    {sheet.key.color && (
                      <div
                        className="w-5 h-5 rounded-full border border-border"
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
                  <h3
                    id={`lyricist-heading-${language}`}
                    className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Lyricist
                  </h3>
                  <p className="text-lg">{sheet.lyricist.name}</p>
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
                  <h3
                    id={`category-heading-${language}`}
                    className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Category
                  </h3>
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
                  <h3
                    id={`year-heading-${language}`}
                    className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Year
                  </h3>
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
              <h3
                id={`description-heading-${language}`}
                className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
              >
                Description
              </h3>
              <p className="text-lg leading-relaxed">{sheet.description}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SheetViewer({
  initialSheetUrl,
  selectedSheet,
}: SheetViewerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sheet");
  const [selectedLanguage, setSelectedLanguage] = useState("bg");
  const [secondaryLanguage, setSecondaryLanguage] = useState<string | null>(
    "de"
  );

  useEffect(() => {
    const savedTab = localStorage.getItem("sheetViewerTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const getLyrics = () => {
    if (!selectedSheet?.lyrics) return [];

    // Return all languages that have lyrics in the sheet
    return Object.entries(selectedSheet.lyrics).map(([code, text]) => ({
      language: code,
      text: text.join("\n"),
    }));
  };

  const lyrics = getLyrics();
  const hasLyrics = lyrics.length > 0;

  const availableLanguages = lyrics.map((l) => l.language);
  const primaryLyrics = lyrics.find(
    (l) => l.language === selectedLanguage
  )?.text;
  const secondaryLyrics = secondaryLanguage
    ? lyrics.find((l) => l.language === secondaryLanguage)?.text
    : null;

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value === "back") {
            router.push("/sheets");
            return;
          }
          setActiveTab(value);
          localStorage.setItem("sheetViewerTab", value);
        }}
        className="relative"
      >
        <div className="flex justify-center">
          <TabsList className="flex w-full justify-between items-center gap-1 h-auto sm:h-14 sm:gap-2">
            <TabsTrigger
              value="back"
              className="flex-1 sm:flex-initial px-2 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-lg"
            >
              <TabIcon icon={ArrowLeft} isSelected={false} />
              <span className="hidden sm:inline ml-2"></span>
            </TabsTrigger>
            {tabs
              .filter((tab) => tab.id !== "back")
              .map(({ id, label, icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="flex-1 sm:flex-initial px-2 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-lg"
                >
                  <TabIcon icon={icon} isSelected={activeTab === id} />
                  <span className="hidden sm:inline ml-2">{label}</span>
                </TabsTrigger>
              ))}
          </TabsList>
        </div>

        <TabsContent value="sheet" className="mt-4">
          {activeTab === "sheet" && initialSheetUrl && (
            <MusicSheetDisplay initialSheet={initialSheetUrl} />
          )}
        </TabsContent>

        {hasLyrics && (
          <TabsContent value="lyrics" className="mt-12">
            <div className="flex flex-col lg:flex-row gap-8 relative">
              <div className="w-full lg:w-1/2">
                <div className="sticky top-4">
                  <div className="mb-3">
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-[220px]">
                        <Globe2 className="mr-2 h-5 w-5" />
                        <SelectValue placeholder="Primary language" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLanguages
                          .map((langCode) => ({
                            code: langCode,
                            name:
                              SUPPORTED_LANGUAGES.find(
                                (l) => l.code === langCode
                              )?.name || langCode,
                          }))
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(({ code, name }) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
                    <div className="p-6 max-w-2xl mx-auto">
                      <div className="whitespace-pre-wrap text-lg leading-loose tracking-wide">
                        {primaryLyrics
                          ?.split("\n\n")
                          .map((stanza, stanzaIndex) => (
                            <div key={stanzaIndex} className="mb-12 last:mb-0">
                              {stanza.split("\n").map((line, lineIndex) => (
                                <div
                                  key={`${stanzaIndex}-${lineIndex}`}
                                  className="px-3 py-1 rounded hover:bg-orange-50/80 hover:text-orange-900 dark:hover:bg-orange-500/10 dark:hover:text-orange-300 transition-colors"
                                >
                                  {line}
                                </div>
                              ))}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="sticky top-4">
                  <div className="mb-3">
                    <Select
                      value={secondaryLanguage || "none"}
                      onValueChange={(value) =>
                        setSecondaryLanguage(value === "none" ? null : value)
                      }
                    >
                      <SelectTrigger className="w-[220px]">
                        <Globe2 className="mr-2 h-5 w-5" />
                        <SelectValue placeholder="Compare with..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {availableLanguages
                          .filter((lang) => lang !== selectedLanguage)
                          .map((langCode) => ({
                            code: langCode,
                            name:
                              SUPPORTED_LANGUAGES.find(
                                (l) => l.code === langCode
                              )?.name || langCode,
                          }))
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(({ code, name }) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {secondaryLyrics && (
                    <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
                      <div className="p-6 max-w-2xl mx-auto">
                        <div className="whitespace-pre-wrap text-lg leading-loose tracking-wide">
                          {secondaryLyrics
                            ?.split("\n\n")
                            .map((stanza, stanzaIndex) => (
                              <div
                                key={stanzaIndex}
                                className="mb-12 last:mb-0"
                              >
                                {stanza.split("\n").map((line, lineIndex) => (
                                  <div
                                    key={`${stanzaIndex}-${lineIndex}`}
                                    className="px-3 py-1 rounded hover:bg-orange-50/80 hover:text-orange-900 dark:hover:bg-orange-500/10 dark:hover:text-orange-300 transition-colors"
                                  >
                                    {line}
                                  </div>
                                ))}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="info" className="mt-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Primary Language Column */}
              <div className="w-full lg:w-1/2">
                <div className="sticky top-4">
                  <div className="mb-3">
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-[220px]">
                        <Globe2 className="mr-2 h-5 w-5" />
                        <SelectValue placeholder="Primary language" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLanguages
                          .map((langCode) => ({
                            code: langCode,
                            name:
                              SUPPORTED_LANGUAGES.find(
                                (l) => l.code === langCode
                              )?.name || langCode,
                          }))
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(({ code, name }) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <InfoCard sheet={selectedSheet} language={selectedLanguage} />
                </div>
              </div>

              {/* Secondary Language Column */}
              <div className="w-full lg:w-1/2">
                <div className="sticky top-4">
                  <div className="mb-3">
                    <Select
                      value={secondaryLanguage || "none"}
                      onValueChange={(value) =>
                        setSecondaryLanguage(value === "none" ? null : value)
                      }
                    >
                      <SelectTrigger className="w-[220px]">
                        <Globe2 className="mr-2 h-5 w-5" />
                        <SelectValue placeholder="Compare with..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {availableLanguages
                          .filter((lang) => lang !== selectedLanguage)
                          .map((langCode) => ({
                            code: langCode,
                            name:
                              SUPPORTED_LANGUAGES.find(
                                (l) => l.code === langCode
                              )?.name || langCode,
                          }))
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(({ code, name }) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {secondaryLanguage && (
                    <InfoCard
                      sheet={selectedSheet}
                      language={secondaryLanguage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {activeTab === "player" && (
          <div className="p-6">
            <div className="space-y-6">
              {selectedSheet?.audio?.vocal?.url ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Vocal Version
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSheet.audio.vocal.description}
                  </p>
                  <div className="audio-container">
                    <AudioPlayer
                      autoPlay={false}
                      src={selectedSheet.audio.vocal.url}
                      onPlay={(e) => {
                        const audio = e.target as HTMLAudioElement;
                        audio.play().catch((error) => {
                          console.error("Error playing audio:", error);
                        });
                      }}
                      showJumpControls={true}
                      showSkipControls={true}
                      showFilledVolume={true}
                      hasDefaultKeyBindings={true}
                      layout="horizontal"
                      customControlsSection={[
                        RHAP_UI.ADDITIONAL_CONTROLS,
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME_CONTROLS,
                      ]}
                      customProgressBarSection={[
                        RHAP_UI.CURRENT_TIME,
                        RHAP_UI.PROGRESS_BAR,
                        RHAP_UI.DURATION,
                      ]}
                      timeFormat="mm:ss"
                      volume={0.8}
                      volumeJumpStep={0.1}
                      progressJumpStep={5000}
                      className="rhap_container rhap_custom-player"
                    />
                  </div>
                </div>
              ) : null}
              {selectedSheet?.audio?.instrumental?.url ? (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Piano className="h-4 w-4" />
                    Instrumental Version
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSheet.audio.instrumental.description}
                  </p>
                  <div className="audio-container">
                    <AudioPlayer
                      autoPlay={false}
                      src={selectedSheet.audio.instrumental.url}
                      onPlay={(e) => {
                        const audio = e.target as HTMLAudioElement;
                        audio.play().catch((error) => {
                          console.error("Error playing audio:", error);
                        });
                      }}
                      showJumpControls={true}
                      showSkipControls={true}
                      showFilledVolume={true}
                      hasDefaultKeyBindings={true}
                      layout="horizontal"
                      customControlsSection={[
                        RHAP_UI.ADDITIONAL_CONTROLS,
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME_CONTROLS,
                      ]}
                      customProgressBarSection={[
                        RHAP_UI.CURRENT_TIME,
                        RHAP_UI.PROGRESS_BAR,
                        RHAP_UI.DURATION,
                      ]}
                      timeFormat="mm:ss"
                      volume={0.8}
                      volumeJumpStep={0.1}
                      progressJumpStep={5000}
                      className="rhap_container rhap_custom-player"
                    />
                  </div>
                </div>
              ) : null}
              {!selectedSheet?.audio?.vocal?.url &&
                !selectedSheet?.audio?.instrumental?.url && (
                  <div className="text-center text-muted-foreground py-4">
                    No audio available for this sheet music.
                  </div>
                )}
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
}
