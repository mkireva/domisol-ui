"use server";

import { promises as fs } from "fs";
import path from "path";

export type Lyric = {
  language: string;
  text: string[];
};

export type Key = {
  tonic: string;
  mode: string;
  color: string;
};

export type Lyricist = {
  name: string;
  notes: string;
};

export type MusicSheet = {
  name: string;
  url: string;
  composer: string;
  lyricist?: Lyricist;
  year: number;
  location?: string;
  description: string;
  key: Key;
  category: "vocal" | "instrumental";
  genre?: string;
  lyrics?: {
    [key: string]: string[];
  };
  audio?: {
    vocal?: {
      url: string;
      description?: string;
    };
    instrumental?: {
      url: string;
      description?: string;
    };
  };
};

export async function getMusicXMLExamples(): Promise<MusicSheet[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "music_xml_examples.json"
  );
  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContents);
    return data.examples || [];
  } catch (error) {
    console.error("Error reading music XML examples:", error);
    // Return default sheet if file reading fails
    return [
      {
        name: "Muzio Clementi Sonatina",
        url: "https://opensheetmusicdisplay.github.io/demo/MuzioClementi_SonatinaOpus36No1_Part1.xml",
        composer: "Muzio Clementi",
        year: 1797,
        description: "First part of a popular sonatina for piano",
        key: {
          tonic: "C",
          mode: "major",
          color: "red"
        },
        category: "instrumental"
      }
    ];
  }
}
