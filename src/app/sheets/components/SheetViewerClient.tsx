"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Info,
  Globe2,
  PlayCircle,
  FileText,
  ArrowLeft,
  ListMusic,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MusicSheet } from "../actions";
import { SUPPORTED_LANGUAGES, TABS } from "../constants";
import { InfoCard } from "./InfoCard";
import { SheetAudioPlayer } from "./SheetAudioPlayer";
import { LyricsView } from "./LyricsView";
import MusicSheetDisplay from "../MusicSheetDisplay";

interface SheetViewerClientProps {
  initialSheetUrl?: string;
  selectedSheet?: MusicSheet;
}

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

export function SheetViewerClient({
  initialSheetUrl,
  selectedSheet,
}: SheetViewerClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sheet");
  const [selectedLanguage, setSelectedLanguage] = useState("bg");
  const [secondaryLanguage, setSecondaryLanguage] = useState<string | null>("de");

  useEffect(() => {
    const savedTab = localStorage.getItem("sheetViewerTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const getLyrics = () => {
    if (!selectedSheet?.lyrics) return [];
    return Object.entries(selectedSheet.lyrics).map(([code, text]) => ({
      language: code,
      text: text.join("\n"),
    }));
  };

  const lyrics = getLyrics();
  const hasLyrics = lyrics.length > 0;
  const availableLanguages = lyrics.map((l) => l.language);

  return (
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
              >
                <TabIcon icon={IconComponent} isSelected={activeTab === id} />
                <span className="hidden sm:inline ml-2">{label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      <TabsContent value="sheet" className="mt-4">
        {activeTab === "sheet" && initialSheetUrl && (
          <MusicSheetDisplay initialSheet={initialSheetUrl} />
        )}
      </TabsContent>

      {hasLyrics && (
        <TabsContent value="lyrics" className="mt-12">
          <LyricsView
            sheet={selectedSheet}
            selectedLanguage={selectedLanguage}
            secondaryLanguage={secondaryLanguage}
            onLanguageChange={setSelectedLanguage}
            onSecondaryLanguageChange={setSecondaryLanguage}
            availableLanguages={availableLanguages}
          />
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
                            SUPPORTED_LANGUAGES.find((l) => l.code === langCode)
                              ?.name || langCode,
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
                            SUPPORTED_LANGUAGES.find((l) => l.code === langCode)
                              ?.name || langCode,
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
                  <InfoCard sheet={selectedSheet} language={secondaryLanguage} />
                )}
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="player" className="mt-12">
        <SheetAudioPlayer sheet={selectedSheet} />
      </TabsContent>
    </Tabs>
  );
}
