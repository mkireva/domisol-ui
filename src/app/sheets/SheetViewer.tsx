"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicSheetDisplay from "./MusicSheetDisplay";
import { Card } from "@/components/ui/card";
import { Music, MessageSquareText, Info, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LyricsContent {
  text: string;
  language: string;
}

interface SheetViewerProps {
  initialSheet?: string;
  lyrics?: LyricsContent[];
  information?: {
    title?: string;
    composer?: string;
    year?: string;
    description?: string;
    additionalInfo?: string;
  };
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
  icon: any;
  isSelected: boolean;
}) => (
  <Icon
    className={cn(
      "w-5 h-5 transition-all duration-200",
      isSelected ? "text-primary scale-110" : "text-muted-foreground"
    )}
  />
);

export default function SheetViewer({
  initialSheet,
  lyrics = [],
  information = {},
}: SheetViewerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isSwapped, setIsSwapped] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sheet");
  const currentLyrics = lyrics?.find((l) => l.language === selectedLanguage);
  const bulgarianLyrics = lyrics?.find((l) => l.language === "bg");
  const currentInfo = information[selectedLanguage as keyof typeof information] || information;
  const bulgarianInfo = information["bg" as keyof typeof information] || information;

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  const renderLyricsBox = (type: "bulgarian" | "selected") => {
    const isLeftBox =
      (type === "bulgarian" && !isSwapped) ||
      (type === "selected" && isSwapped);
    const lyrics = type === "bulgarian" ? bulgarianLyrics : currentLyrics;
    const lang = type === "bulgarian" ? "BG" : selectedLanguage?.toUpperCase();
    const name =
      type === "bulgarian"
        ? "Bulgarian"
        : SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.name ||
          "Select Language";

    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: isLeftBox ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <span className="font-semibold text-primary text-sm">{lang}</span>
          </div>
          <h3 className="font-semibold text-lg text-foreground/90">{name}</h3>
        </div>
        <div className="relative bg-background/40 backdrop-blur-sm group hover:bg-background/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none" />
          <div className="relative p-6">
            {lyrics ? (
              <div className="whitespace-pre-wrap leading-relaxed">
                {lyrics.text.split("\n").map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeftBox ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.05 * (index % 5),
                    }}
                    className={cn(
                      "py-1.5 text-foreground/90",
                      line.trim() === "" && "h-6",
                      line.trim() !== "" &&
                        "hover:text-primary transition-colors"
                    )}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center h-full gap-4 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 rounded-full bg-primary/5">
                  <Globe2 className="w-6 h-6 text-primary/40" />
                </div>
                <p className="text-base text-muted-foreground">
                  Select a language to compare with Bulgarian
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderInfoBox = (type: "bulgarian" | "selected") => {
    const isLeftBox = (type === "bulgarian" && !isSwapped) || (type === "selected" && isSwapped);
    const info = type === "bulgarian" ? bulgarianInfo : currentInfo;
    const lang = type === "bulgarian" ? "BG" : selectedLanguage?.toUpperCase();
    const name = type === "bulgarian" 
      ? "Bulgarian" 
      : SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.name || "Select Language";

    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: isLeftBox ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <span className="font-semibold text-primary text-sm">{lang}</span>
          </div>
          <h3 className="font-semibold text-lg text-foreground/90">{name}</h3>
        </div>
        <div className="relative bg-background/40 backdrop-blur-sm group hover:bg-background/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none" />
          <div className="relative p-6">
            {info ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground/60 mb-1">Title</h4>
                  <p className="text-foreground/90">{typeof info === 'string' ? info : info.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground/60 mb-1">Composer</h4>
                  <p className="text-foreground/90">{typeof info === 'string' ? '' : info.composer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground/60 mb-1">Description</h4>
                  <p className="text-foreground/90 whitespace-pre-wrap">{typeof info === 'string' ? '' : info.description}</p>
                </div>
                {typeof info === 'object' && info.additionalInfo && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground/60 mb-1">Additional Information</h4>
                    <p className="text-foreground/90 whitespace-pre-wrap">{info.additionalInfo}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-foreground/60 italic">Select a language to view information</p>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Tabs
      defaultValue="sheet"
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="w-full space-y-8"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-xl h-[1px] -z-10" />
        <TabsList className="relative w-full max-w-2xl mx-auto grid grid-cols-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsTrigger
            value="sheet"
            className="data-[state=active]:bg-background/50 gap-2 py-3"
          >
            <TabIcon icon={Music} isSelected={selectedTab === "sheet"} />
            <span
              className={cn("transition-colors duration-200", {
                "text-primary": selectedTab === "sheet",
                "text-muted-foreground": selectedTab !== "sheet",
              })}
            >
              Sheet Music
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="lyrics"
            className="data-[state=active]:bg-background/50 gap-2 py-3"
          >
            <TabIcon icon={MessageSquareText} isSelected={selectedTab === "lyrics"} />
            <span
              className={cn("transition-colors duration-200", {
                "text-primary": selectedTab === "lyrics",
                "text-muted-foreground": selectedTab !== "lyrics",
              })}
            >
              Lyrics
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="data-[state=active]:bg-background/50 gap-2 py-3"
          >
            <TabIcon icon={Info} isSelected={selectedTab === "info"} />
            <span
              className={cn("transition-colors duration-200", {
                "text-primary": selectedTab === "info",
                "text-muted-foreground": selectedTab !== "info",
              })}
            >
              Information
            </span>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="mt-6">
        <TabsContent value="sheet" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 border-none bg-background/50 backdrop-blur-sm shadow-lg">
              <MusicSheetDisplay initialSheet={initialSheet} />
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="lyrics" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 border-none bg-gradient-to-br from-background/95 to-background/50 backdrop-blur-lg shadow-xl">
              {lyrics?.length > 0 ? (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Globe2 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/80">
                        Compare with:
                      </span>
                    </div>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-background/90 transition-colors">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_LANGUAGES.filter(
                          (lang) => lang.code !== "bg"
                        ).map((lang) => (
                          <SelectItem
                            key={lang.code}
                            value={lang.code}
                            className="cursor-pointer hover:bg-primary/5"
                          >
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <motion.div
                    className="relative pt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {/* Swap Button */}
                    <div className="absolute left-0 right-0 top-6 flex items-center justify-center">
                      <motion.button
                        onClick={handleSwap}
                        className="absolute top-0 -translate-y-1/2 hidden md:flex items-center justify-center px-3 h-8 rounded-md text-orange-600/80 hover:text-orange-500 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="18"
                          viewBox="0 0 40 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M35 17h-20m20 0-3 3m3-3-3-3M5 7h20m-20 0 3-3m-3 3 3 3" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Lyrics Boxes Container */}
                    <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
                      {/* Vertical Dividing Line */}
                      <div className="hidden md:block absolute left-1/2 top-0 w-[2px] h-full -translate-x-1/2">
                        <div className="w-full h-full bg-gradient-to-b from-primary/30 via-primary/40 to-primary/30" />
                      </div>

                      {/* Lyrics Boxes */}
                      <div className="flex-1 md:pr-8">
                        {isSwapped
                          ? renderLyricsBox("selected")
                          : renderLyricsBox("bulgarian")}
                      </div>
                      <div className="flex-1 md:pl-8">
                        {isSwapped
                          ? renderLyricsBox("bulgarian")
                          : renderLyricsBox("selected")}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 rounded-full bg-primary/5 w-fit mx-auto mb-4">
                    <MessageSquareText className="w-8 h-8 text-primary/40" />
                  </div>
                  <p className="text-muted-foreground">
                    No lyrics available for this sheet music.
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="info" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 border-none bg-background/50 backdrop-blur-sm shadow-lg">
              {Object.keys(information).length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Select
                      value={selectedLanguage}
                      onValueChange={(value) => setSelectedLanguage(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_LANGUAGES.map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <motion.div
                    className="relative pt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {/* Swap Button */}
                    <div className="absolute left-0 right-0 top-6 flex items-center justify-center">
                      <motion.button
                        onClick={handleSwap}
                        className="absolute top-0 -translate-y-1/2 hidden md:flex items-center justify-center px-3 h-8 rounded-md text-orange-600/80 hover:text-orange-500 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="18"
                          viewBox="0 0 40 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M35 17h-20m20 0-3 3m3-3-3-3M5 7h20m-20 0 3-3m-3 3 3 3" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Info Boxes Container */}
                    <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
                      {/* Vertical Dividing Line */}
                      <div className="hidden md:block absolute left-1/2 top-0 w-[2px] h-full -translate-x-1/2">
                        <div className="w-full h-full bg-gradient-to-b from-primary/30 via-primary/40 to-primary/30" />
                      </div>

                      {/* Info Boxes */}
                      <div className="flex-1 md:pr-8">
                        {isSwapped ? renderInfoBox("selected") : renderInfoBox("bulgarian")}
                      </div>
                      <div className="flex-1 md:pl-8">
                        {isSwapped ? renderInfoBox("bulgarian") : renderInfoBox("selected")}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Info className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    No additional information available.
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
