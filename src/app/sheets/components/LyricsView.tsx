import { Globe2 } from "lucide-react";
import { MusicSheet } from "../actions";
import { SUPPORTED_LANGUAGES } from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LyricsViewProps {
  sheet: MusicSheet | undefined;
  selectedLanguage: string;
  secondaryLanguage: string | null;
  onLanguageChange: (lang: string) => void;
  onSecondaryLanguageChange: (lang: string | null) => void;
  availableLanguages: string[];
}

export function LyricsView({
  sheet,
  selectedLanguage,
  secondaryLanguage,
  onLanguageChange,
  onSecondaryLanguageChange,
  availableLanguages,
}: LyricsViewProps) {
  const getLyrics = () => {
    if (!sheet?.lyrics) return [];
    return Object.entries(sheet.lyrics).map(([code, text]) => ({
      language: code,
      text: text.join("\n"),
    }));
  };

  const lyrics = getLyrics();
  const primaryLyrics = lyrics.find(
    (l) => l.language === selectedLanguage
  )?.text;
  const secondaryLyrics = secondaryLanguage
    ? lyrics.find((l) => l.language === secondaryLanguage)?.text
    : null;

  return (
    <div className="max-w-[1200px] mx-auto pt-10">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/2">
          <div className="sticky top-4">
            <div className="mb-6">
              <Select value={selectedLanguage} onValueChange={onLanguageChange}>
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
            <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
              <div className="p-8">
                <div className="whitespace-pre-wrap text-lg leading-loose tracking-wide">
                  {primaryLyrics?.split("\n\n").map((stanza, stanzaIndex) => (
                    <div key={stanzaIndex} className="mb-14 last:mb-0">
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
            <div className="mb-6">
              <Select
                value={secondaryLanguage || "none"}
                onValueChange={(value) =>
                  onSecondaryLanguageChange(value === "none" ? null : value)
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
            {secondaryLyrics && (
              <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
                <div className="p-8">
                  <div className="whitespace-pre-wrap text-lg leading-loose tracking-wide">
                    {secondaryLyrics?.split("\n\n").map((stanza, stanzaIndex) => (
                      <div key={stanzaIndex} className="mb-14 last:mb-0">
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
    </div>
  );
}
