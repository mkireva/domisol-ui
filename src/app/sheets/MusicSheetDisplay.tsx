"use client";

import { useEffect, useRef, useState } from "react";
import {
  OpenSheetMusicDisplay as OSMD,
  IOSMDOptions,
} from "opensheetmusicdisplay";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const osmdInstanceRef = useRef<OSMD | null>(null);
  const [zoom, setZoom] = useState(window.innerWidth < 768 ? 0.5 : 1);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setZoom(isMobileView ? 0.5 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!initialSheet || !containerRef.current) {
      setError("No sheet music specified");
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const initializeOSMD = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (osmdInstanceRef.current) {
          osmdInstanceRef.current.clear();
          osmdInstanceRef.current = null;
        }

        if (!mounted || !containerRef.current) {
          setError("Unable to render sheet music");
          setIsLoading(false);
          return;
        }

        const titleFontSize = isMobile ? 1.2 : 1.5;
        const composerFontSize = isMobile ? 0.8 : 1;

        const osmd = new OSMD(containerRef.current, {
          autoResize: true,
          drawTitle: true,
          disableCursor: false,
          drawPartNames: !isMobile,
          drawMeasureNumbers: !isMobile,
          drawMetronomeMarks: !isMobile,
          pageFormat: "Endless",
          spacingBetweenTextLines: isMobile ? (zoom < 0.7 ? 3 : 2) : (zoom < 0.7 ? 4 : 3),
          zoom: isMobile ? zoom : zoom,
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
            #osmdCanvasPage1,
            .osmdCanvasPage {
              max-width: 100% !important;
              overflow-x: hidden !important;
            }
          `,
        } as ExtendedOSMDOptions);

        if (!mounted) return;
        osmdInstanceRef.current = osmd;

        try {
          const response = await fetch(`/api/sheet?url=${encodeURIComponent(initialSheet)}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to fetch sheet music: ${response.statusText}`);
          }

          if (!mounted) return;
          const musicXML = await response.text();

          await osmd.load(musicXML);
          await osmd.render();

          osmd.zoom = zoom;
          await osmd.render();

          if (mounted) {
            setIsLoading(false);
          }
        } catch (loadError) {
          console.error("Failed to load or render sheet:", loadError);
          if (mounted) {
            const errorMessage = loadError instanceof Error 
              ? loadError.message 
              : String(loadError);
            setError(`Failed to load music sheet: ${errorMessage}`);
          }
          throw loadError;
        }
      } catch (err: unknown) {
        console.error("Error initializing music sheet:", err);
        if (mounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
        }
        setIsLoading(false);
      }
    };

    initializeOSMD();

    return () => {
      mounted = false;
      if (osmdInstanceRef.current) {
        osmdInstanceRef.current.clear();
        osmdInstanceRef.current = null;
      }
    };
  }, [initialSheet, isMobile, zoom]);

  const handleZoomIn = () => {
    if (osmdInstanceRef.current && containerRef.current) {
      const scrollPosition = window.scrollY;
      const newZoom = Math.min(zoom + 0.1, 2);
      setZoom(newZoom);
      osmdInstanceRef.current.zoom = newZoom;
      osmdInstanceRef.current.render();
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  };

  const handleZoomOut = () => {
    if (osmdInstanceRef.current && containerRef.current) {
      const scrollPosition = window.scrollY;
      const newZoom = Math.max(zoom - 0.1, 0.5);
      setZoom(newZoom);
      osmdInstanceRef.current.zoom = newZoom;
      osmdInstanceRef.current.render();
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  };

  return (
    <div className="relative">
      <div className="relative pt-6">
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-background/60 p-1.5 rounded-lg border border-border/20 shadow-xs backdrop-blur-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="h-7 w-7 rounded-md bg-transparent transition-all hover:bg-primary/10 hover:text-primary active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              title="Zoom out"
            >
              <span className="sr-only">Zoom out</span>
              <ZoomOut className="h-4 w-4" aria-hidden="true" />
            </Button>
            <div className="px-2 min-w-14">
              <span className="block text-center text-xs font-medium select-none" aria-label="Current zoom level">
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
              <span className="sr-only">Zoom in</span>
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
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
          ref={containerRef}
          className={cn(
            "relative rounded-lg bg-background/95 border shadow-xs backdrop-blur-xs",
            "dark:bg-card dark:shadow-lg",
            "osmd-container [&_.osmd-music-sheet]:mx-auto [&_svg]:max-w-full",
            "[&_.title]:text-foreground [&_.subtitle]:text-muted-foreground [&_.composer]:text-muted-foreground",
            "dark:[&_svg]:brightness-[1.15]",
            "[&_svg_*]:fill-foreground [&_svg_*]:stroke-foreground",
            "dark:[&_svg_*]:fill-foreground dark:[&_svg_*]:stroke-foreground",
            "p-4 sm:p-4 md:p-6",
            "mx-auto max-w-full w-full",
            "overflow-x-auto",
            isLoading && "min-h-[400px]"
          )}
        />
      </div>
    </div>
  );
}
