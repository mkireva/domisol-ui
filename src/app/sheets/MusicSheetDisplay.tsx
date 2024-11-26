"use client";

import { useEffect, useRef, useState } from "react";
import { OpenSheetMusicDisplay as OSMD, IOSMDOptions } from "opensheetmusicdisplay";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtendedOSMDOptions extends IOSMDOptions {
  zoom?: number;
}

interface MusicSheetDisplayProps {
  initialSheet?: string;
  initialSheets?: Array<{ url: string; name: string }>;
}

export default function MusicSheetDisplay({
  initialSheet,
}: MusicSheetDisplayProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const osmdRef = useRef<OSMD | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!initialSheet) {
      console.log("No initial sheet provided");
      setError("No sheet music specified");
      setIsLoading(false);
      return;
    }

    console.log("Attempting to load sheet:", initialSheet);

    const initializeOSMD = async () => {
      if (!divRef.current) {
        console.log("Display container not ready");
        setError("Display container not ready");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Reset OSMD instance when sheet changes
        if (osmdRef.current) {
          console.log("Clearing existing OSMD instance");
          osmdRef.current.clear();
          osmdRef.current = null;
        }

        console.log("Creating new OSMD instance");
        const titleFontSize = isMobile ? 1.2 : 1.5;
        const composerFontSize = isMobile ? 0.8 : 1;

        osmdRef.current = new OSMD(divRef.current, {
          autoResize: true,
          drawTitle: true,
          disableCursor: false,
          drawPartNames: !isMobile,
          drawMeasureNumbers: !isMobile,
          drawMetronomeMarks: !isMobile,
          pageFormat: "Endless",
          spacingBetweenTextLines: isMobile
            ? zoom < 0.7
              ? 3
              : 2
            : zoom < 0.7
            ? 4
            : 3,
          zoom: isMobile ? zoom * 0.7 : zoom,
          drawingParameters: "compact",
          backend: "svg",
          customCSS: `
            .title { 
              font-size: ${titleFontSize}em !important;
              margin-bottom: 0.5em !important;
              padding: 0 1rem !important;
            }
            .subtitle {
              margin-top: 0.25em !important;
              padding: 0 1rem !important;
            }
            @media (max-width: 640px) {
              .title {
                font-size: ${titleFontSize * 0.8}em !important;
                margin-bottom: 0.25em !important;
              }
              .subtitle {
                font-size: 0.9em !important;
              }
            }
            .composer { 
              font-size: ${composerFontSize}em !important;
              text-align: center !important;
            }
            .osmd-music-sheet {
              margin: 0 auto !important;
              max-width: 100% !important;
              overflow-x: hidden !important;
            }
            #osmdCanvasPage1 {
              max-width: 100% !important;
              overflow-x: hidden !important;
            }
            .osmdCanvasPage {
              max-width: 100% !important;
              overflow-x: hidden !important;
            }
          `,
        } as ExtendedOSMDOptions);

        try {
          console.log("Fetching sheet music through proxy:", initialSheet);
          const proxyUrl = `/api/sheet?url=${encodeURIComponent(initialSheet)}`;
          const response = await fetch(proxyUrl);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error ||
                `Failed to fetch sheet music: ${response.statusText}`
            );
          }

          const musicXML = await response.text();
          console.log("Sheet music fetched, loading into OSMD");

          await osmdRef.current.load(musicXML);
          console.log("Sheet music loaded into OSMD");

          await osmdRef.current.render();
          console.log("Sheet music rendered");

          // Apply zoom after rendering
          osmdRef.current.zoom = zoom;
          await osmdRef.current.render();
          console.log("Zoom applied:", zoom);
        } catch (loadError) {
          console.error("Failed to load or render sheet:", loadError);
          setError(
            `Failed to load music sheet: ${
              loadError instanceof Error ? loadError.message : String(loadError)
            }`
          );
          throw loadError;
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing music sheet:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to initialize the music sheet viewer"
        );
        setIsLoading(false);
      }
    };

    initializeOSMD();

    // Cleanup function
    return () => {
      if (osmdRef.current) {
        osmdRef.current.clear();
        osmdRef.current = null;
      }
    };
  }, [initialSheet, isMobile, zoom]);

  const handleZoomIn = () => {
    if (osmdRef.current && divRef.current) {
      const scrollPosition = window.scrollY;
      const newZoom = Math.min(zoom + 0.1, 2);
      setZoom(newZoom);
      osmdRef.current.zoom = newZoom;
      osmdRef.current.render();
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  };

  const handleZoomOut = () => {
    if (osmdRef.current && divRef.current) {
      const scrollPosition = window.scrollY;
      const newZoom = Math.max(zoom - 0.1, 0.5);
      setZoom(newZoom);
      osmdRef.current.zoom = newZoom;
      osmdRef.current.render();
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 bg-background/60 p-1.5 rounded-lg border border-border/20 shadow-sm backdrop-blur-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="h-7 w-7 rounded-md bg-transparent transition-all hover:bg-primary/10 hover:text-primary active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="px-2 min-w-[3.5rem]">
              <span className="block text-center text-xs font-medium select-none">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 2}
              className="h-7 w-7 rounded-md bg-transparent transition-all hover:bg-primary/10 hover:text-primary active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center p-12">
            <div className="space-y-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
              <p className="text-muted-foreground">Loading sheet music...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center p-12">
            <div className="max-w-md space-y-2 text-center">
              <p className="text-destructive font-medium">Error</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        <div
          ref={divRef}
          className={cn(
            "relative rounded-lg bg-background/95 p-4 border shadow-sm backdrop-blur-sm",
            "dark:bg-card dark:shadow-lg",
            "osmd-container [&_.osmd-music-sheet]:mx-auto [&_svg]:max-w-full",
            "[&_.title]:text-foreground [&_.subtitle]:text-muted-foreground [&_.composer]:text-muted-foreground",
            "[&_svg]:dark:brightness-[1.15]",
            "[&_svg_*]:fill-foreground [&_svg_*]:stroke-foreground",
            "[&_svg_*]:dark:fill-foreground [&_svg_*]:dark:stroke-foreground",
            isLoading && "min-h-[400px]"
          )}
        />
      </div>
    </div>
  );
}
