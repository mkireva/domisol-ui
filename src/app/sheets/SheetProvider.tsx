import { getMusicXMLExamples } from "./actions";
import SheetViewer from "./SheetViewer";

interface SheetProviderProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const getFileParam = async (searchParams?: { [key: string]: string | string[] | undefined }): Promise<string | undefined> => {
  if (!searchParams) return undefined;
  
  // Use Promise.resolve to ensure we're handling the searchParams asynchronously
  const params = await Promise.resolve(searchParams);
  const file = params['file'];
  console.log('File param from URL:', file);
  return typeof file === 'string' ? file : undefined;
};

export default async function SheetProvider({ searchParams }: SheetProviderProps) {
  const [sheets, fileParam] = await Promise.all([
    getMusicXMLExamples(),
    getFileParam(searchParams)
  ]);
  
  const initialSheet = fileParam || (sheets.length > 0 ? sheets[0].url : undefined);
  console.log('Sheets:', sheets);
  console.log('File param:', fileParam);
  console.log('Initial sheet:', initialSheet);

  const exampleLyrics = [
    {
      language: "bg",
      text: "Тиха нощ, свята нощ!\nВсичко спи, навред цари мир.\nСамо будни и верни двама\nБдят над скъпото Дете сами -\nСпи спокойно то там.\nСпи спокойно то там.\n\nТиха нощ, свята нощ!\nАнгел Божи възвести пръв\nНа пастири край Витлеем:\nТам роди се Спасител на всем -\nХристос, Господ и Цар!\nХристос, Господ и Цар!"
    },
    {
      language: "de",
      text: "Stille Nacht, heilige Nacht!\nAlles schläft, einsam wacht\nNur das traute, hochheilige Paar.\nHolder Knabe im lockigen Haar,\nSchlaf in himmlischer Ruh,\nSchlaf in himmlischer Ruh.\n\nStille Nacht, heilige Nacht!\nHirten erst kundgemacht,\nDurch der Engel Halleluja.\nTönt es laut von fern und nah:\nChrist, der Retter ist da,\nChrist, der Retter ist da!"
    },
    {
      language: "en",
      text: "Silent night, holy night!\nAll is calm, all is bright\nRound yon Virgin Mother and Child,\nHoly Infant so tender and mild,\nSleep in heavenly peace,\nSleep in heavenly peace.\n\nSilent night, holy night!\nShepherds quake at the sight!\nGlories stream from heaven afar,\nHeavenly hosts sing Alleluia,\nChrist the Savior is born,\nChrist the Savior is born!"
    },
    {
      language: "es",
      text: "¡Noche de paz, noche de amor!\nTodo duerme en derredor.\nEntre los astros que esparcen su luz,\nBella anunciando al niñito Jesús,\nBrilla la estrella de paz,\nBrilla la estrella de paz.\n\n¡Noche de paz, noche de amor!\nOye humilde el fiel pastor,\nCoros celestes que anuncian salud,\nGracias y glorias en gran plenitud,\nPor nuestro buen Redentor,\nPor nuestro buen Redentor."
    },
    {
      language: "fr",
      text: "Douce nuit, sainte nuit!\nDans les cieux, l'astre luit.\nLe mystère annoncé s'accomplit.\nCet enfant sur la paille endormi,\nC'est l'amour infini,\nC'est l'amour infini!\n\nDouce nuit, sainte nuit!\nDans les cieux, l'astre luit.\nLes bergers sont d'abord prévenus.\nEn ces lieux, les anges venus,\nChantent l'hymne des cieux,\nChantent l'hymne des cieux!"
    },
    {
      language: "it",
      text: "Astro del ciel, Pargol divin,\nmite Agnello Redentor!\nTu che i Vati da lungi sognar,\nTu che angeliche voci nunziar,\nLuce dona alle genti,\npace infondi nei cuor!\n\nAstro del ciel, Pargol divin,\nmite Agnello Redentor!\nTu di stirpe regale decor,\nTu virgineo, mistico fior,\nLuce dona alle genti,\npace infondi nei cuor!"
    }
  ];

  return <SheetViewer 
    initialSheet={initialSheet}
    lyrics={exampleLyrics}
    information={{
      title: "Silent Night",
      composer: "Franz Xaver Gruber",
      year: "1818",
      description: "Silent Night (German: Stille Nacht) is a popular Christmas carol, composed in 1818 by Franz Xaver Gruber to lyrics by Joseph Mohr in the small town of Oberndorf bei Salzburg, Austria."
    }}
  />;
}
