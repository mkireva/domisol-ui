import { MusicSheet } from "./actions";
import { SheetViewerClient } from "./components/SheetViewerClient";

interface SheetViewerProps {
  sheets: MusicSheet[];
  initialSheetUrl?: string;
  selectedSheet?: MusicSheet;
}

export default function SheetViewer({
  initialSheetUrl,
  selectedSheet,
}: SheetViewerProps) {
  return (
    <div>
      <SheetViewerClient
        initialSheetUrl={initialSheetUrl}
        selectedSheet={selectedSheet}
      />
    </div>
  );
}
