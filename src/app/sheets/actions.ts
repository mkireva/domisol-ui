"use server";

import { promises as fs } from "fs";
import path from "path";

export type MusicSheet = {
  name: string;
  url: string;
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
        url: "https://opensheetmusicdisplay.github.io/demo/MuzioClementi_SonatinaOpus36No1_Part1.xml"
      }
    ];
  }
}
