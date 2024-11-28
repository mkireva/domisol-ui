"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Info,
  Globe2,
  PlayCircle,
  FileText,
  ArrowLeft,
  ListMusic,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { MusicSheet } from "../actions";
import { SUPPORTED_LANGUAGES, TABS } from "../constants";
import { TabIcon } from "./TabIcon";

// Dynamic imports for tab content
const MusicSheetDisplay = dynamic(() => import("../MusicSheetDisplay"), {
  loading: () => <div>Loading sheet...</div>,
  ssr: false,
});

const LyricsView = dynamic(
  () => import("./LyricsView").then((mod) => ({ default: mod.LyricsView })),
  {
    loading: () => <div>Loading lyrics...</div>,
  }
);

const InfoCard = dynamic(
  () => import("./InfoCard").then((mod) => ({ default: mod.InfoCard })),
  {
    loading: () => <div>Loading info...</div>,
  }
);

const SheetAudioPlayer = dynamic(
  () =>
    import("./SheetAudioPlayer").then((mod) => ({
      default: mod.SheetAudioPlayer,
    })),
  {
    loading: () => <div>Loading player...</div>,
  }
);

interface SheetViewerClientProps {
  initialSheetUrl?: string;
  selectedSheet?: MusicSheet;
}

export function SheetViewerClient({
  initialSheetUrl,
  selectedSheet,
}: SheetViewerClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sheet");
  const [selectedLanguage, setSelectedLanguage] = useState("bg");
  const [secondaryLanguage, setSecondaryLanguage] = useState<string | null>(
    "de"
  );
  const [isTabChanging, setIsTabChanging] = useState(false);

  useEffect(() => {
    const savedTab = localStorage.getItem("sheetViewerTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Debounced localStorage update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeTab !== "back") {
        localStorage.setItem("sheetViewerTab", activeTab);
      }
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [activeTab]);

  const handleTabChange = useCallback(
    async (value: string) => {
      if (isTabChanging) return;
      setIsTabChanging(true);

      try {
        if (value === "back") {
          await router.push("/sheets");
          return;
        }
        setActiveTab(value);
      } finally {
        setIsTabChanging(false);
      }
    },
    [router, isTabChanging]
  );

  const getLyrics = useCallback(() => {
    if (!selectedSheet?.lyrics) return [];
    return Object.entries(selectedSheet.lyrics).map(([code, text]) => ({
      language: code,
      text: text.join("\n"),
    }));
  }, [selectedSheet?.lyrics]);

  const lyrics = useMemo(() => getLyrics(), [getLyrics]);
  const hasLyrics = lyrics.length > 0;
  const availableLanguages = useMemo(
    () => lyrics.map((l) => l.language),
    [lyrics]
  );

  const renderTabContent = useCallback(
    (tab: string) => {
      switch (tab) {
        case "sheet":
          return (
            initialSheetUrl && (
              <MusicSheetDisplay initialSheet={initialSheetUrl} />
            )
          );
        case "lyrics":
          return (
            hasLyrics && (
              <LyricsView
                sheet={selectedSheet}
                selectedLanguage={selectedLanguage}
                secondaryLanguage={secondaryLanguage}
                onLanguageChange={setSelectedLanguage}
                onSecondaryLanguageChange={setSecondaryLanguage}
                availableLanguages={availableLanguages}
              />
            )
          );
        case "info":
          return (
            <div className="max-w-[1200px] mx-auto pt-10">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Primary Language Column */}
                <div className="w-full lg:w-1/2">
                  <div className="sticky top-4">
                    <div className="mb-6">
                      <Select
                        value={selectedLanguage}
                        onValueChange={setSelectedLanguage}
                      >
                        <SelectTrigger
                          className="w-[220px]"
                          aria-label="Select primary language"
                        >
                          <Globe2
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
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
                    <InfoCard
                      sheet={selectedSheet}
                      language={selectedLanguage}
                    />
                  </div>
                </div>

                {/* Secondary Language Column */}
                <div className="w-full lg:w-1/2">
                  <div className="sticky top-4">
                    <div className="mb-6">
                      <Select
                        value={secondaryLanguage || "none"}
                        onValueChange={(value) =>
                          setSecondaryLanguage(value === "none" ? null : value)
                        }
                      >
                        <SelectTrigger
                          className="w-[220px]"
                          aria-label="Select language to compare with"
                        >
                          <Globe2
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
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
          );
        case "player":
          return <SheetAudioPlayer sheet={selectedSheet} />;
        default:
          return null;
      }
    },
    [
      initialSheetUrl,
      hasLyrics,
      selectedSheet,
      selectedLanguage,
      secondaryLanguage,
      availableLanguages,
    ]
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="relative"
    >
      <div className="flex justify-center">
        <TabsList className="flex w-full justify-between items-center gap-1 h-auto sm:h-14 sm:gap-2">
          <TabsTrigger
            value="back"
            className="flex-1 sm:flex-initial px-2 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-lg"
            disabled={isTabChanging}
            aria-label="Back to sheets list"
          >
            <TabIcon icon={ArrowLeft} isSelected={false} />
            <span className="hidden sm:inline ml-2">Back</span>
          </TabsTrigger>
          {TABS.filter((tab) => tab.id !== "back").map(({ id, label, icon }) => {
            const IconComponent = {
              ArrowLeft,
              ListMusic,
              FileText,
              PlayCircle,
              Info,
            }[icon];
            return (
              <TabsTrigger
                key={id}
                value={id}
                className="flex-1 sm:flex-initial px-2 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-lg"
                disabled={isTabChanging}
                aria-label={label}
              >
                <TabIcon icon={IconComponent} isSelected={activeTab === id} />
                <span className="hidden sm:inline ml-2">{label}</span>
                <span className="sr-only">{label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {TABS.map(({ id }) => (
        <TabsContent
          key={id}
          value={id}
          className={`mt-${id === "sheet" ? "4" : "12"}`}
        >
          <Suspense fallback={<div>Loading {id}...</div>}>
            {activeTab === id && renderTabContent(id)}
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
}
