import { getMusicXMLExamples } from "./actions";
import MusicSheetDisplay from "./MusicSheetDisplay";

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

  return <MusicSheetDisplay initialSheets={sheets} initialSheet={initialSheet} />;
}
