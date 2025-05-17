"use client";

// Extend the Window interface to include zoomTimeout
declare global {
  interface Window {
    zoomTimeout?: number;
  }
}

import { useEffect, useRef, useState, useCallback } from "react";
import {
  OpenSheetMusicDisplay as OSMD,
  IOSMDOptions,
} from "opensheetmusicdisplay";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Music, AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ExtendedOSMDOptions extends IOSMDOptions {
  zoom?: number;
}

interface MusicSheetDisplayProps {
  initialSheet?: string;
  initialSheets?: Array<{ url: string; name: string }>;
}

// Custom hook for detecting pinch gestures
function usePinchZoom(ref: React.RefObject<HTMLElement>, onZoomChange: (newZoom: number, currentZoom: number) => void) {
  const initialDistanceRef = useRef<number | null>(null);
  const currentZoomRef = useRef<number>(1);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistanceRef.current = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistanceRef.current) {
        e.preventDefault(); // Prevent page zoom
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        
        const scale = currentDistance / initialDistanceRef.current;
        const newZoom = Math.max(0.5, Math.min(2, currentZoomRef.current * scale));
        
        onZoomChange(newZoom, currentZoomRef.current);
      }
    };
    
    const handleTouchEnd = () => {
      initialDistanceRef.current = null;
    };
    
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, onZoomChange]);
  
  return {
    setCurrentZoom: (zoom: number) => {
      currentZoomRef.current = zoom;
    }
  };
}

export default function MusicSheetDisplay({
  initialSheet,
}: MusicSheetDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const osmdInstanceRef = useRef<OSMD | null>(null);
  
  // Use media queries for responsive breakpoints
  const isXs = useMediaQuery("(max-width: 480px)");
  const isSm = useMediaQuery("(max-width: 640px)");
  const isMd = useMediaQuery("(max-width: 768px)");
  
  // Determine initial zoom based on screen size
  const getInitialZoom = useCallback(() => {
    if (isXs) return 0.4;
    if (isSm) return 0.5;
    if (isMd) return 0.7;
    return 1;
  }, [isXs, isSm, isMd]);
  
  const [zoom, setZoom] = useState(1); // Will be set correctly in useEffect
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);

  // Update zoom and mobile state based on screen size
  useEffect(() => {
    setIsMobile(isMd);
    setZoom(getInitialZoom());
  }, [isXs, isSm, isMd, getInitialZoom]);
  
  // Handle pinch zoom gestures
  const handlePinchZoom = useCallback((newZoom: number, currentZoom: number) => {
    if (Math.abs(newZoom - currentZoom) > 0.05) {
      setIsZooming(true);
      setZoom(newZoom);
      
      if (osmdInstanceRef.current) {
        osmdInstanceRef.current.zoom = newZoom;
        osmdInstanceRef.current.render();
      }
      
      // Debounce the zoom end state
      clearTimeout(window.zoomTimeout);
      window.zoomTimeout = window.setTimeout(() => setIsZooming(false), 300) as unknown as number;
    }
  }, []);
  
  const { setCurrentZoom } = usePinchZoom(containerRef as React.RefObject<HTMLElement>, handlePinchZoom);
  
  // Update current zoom reference when zoom changes
  useEffect(() => {
    setCurrentZoom(zoom);
  }, [zoom, setCurrentZoom]);

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

        // Adjust font sizes based on screen size
        const titleFontSize = isXs ? 1 : (isSm ? 1.1 : (isMd ? 1.2 : 1.5));
        const composerFontSize = isXs ? 0.7 : (isSm ? 0.75 : (isMd ? 0.8 : 1));

        const osmd = new OSMD(containerRef.current, {
          autoResize: true,
          drawTitle: true,
          disableCursor: false,
          drawPartNames: !isSm,
          drawMeasureNumbers: !isXs,
          drawMetronomeMarks: !isXs,
          pageFormat: "Endless",
          spacingBetweenTextLines: isXs ? 0.5 : (isSm ? 0.75 : (isMd ? 1 : 1.5)),
          zoom: zoom,
          drawingParameters: "compact",
          backend: "svg",
          customCSS: `
            .title { 
              font-size: ${titleFontSize}em !important;
              margin-bottom: 0.4em !important;
              margin-top: 0 !important;
              padding: 0 1rem !important;
              font-weight: 600 !important;
              letter-spacing: -0.01em !important;
              color: #111827 !important;
            }
            .subtitle {
              margin-top: 0.25em !important;
              padding: 0 1rem !important;
              font-weight: 500 !important;
              letter-spacing: 0.01em !important;
              color: #4B5563 !important;
            }
            @media (max-width: 480px) {
              .title {
                font-size: ${titleFontSize * 0.7}em !important;
                margin-bottom: 0.1em !important;
                margin-top: 0 !important;
                padding: 0 0.5rem !important;
              }
              .subtitle {
                font-size: 0.8em !important;
                padding: 0 0.5rem !important;
              }
              .composer {
                font-size: ${composerFontSize * 0.8}em !important;
              }
            }
            @media (min-width: 481px) and (max-width: 640px) {
              .title {
                font-size: ${titleFontSize * 0.8}em !important;
                margin-bottom: 0.15em !important;
                margin-top: 0 !important;
                padding: 0 0.75rem !important;
              }
              .subtitle {
                font-size: 0.85em !important;
                padding: 0 0.75rem !important;
              }
              .composer {
                font-size: ${composerFontSize * 0.9}em !important;
              }
            }
            .composer { 
              font-size: ${composerFontSize}em !important;
              text-align: center !important;
              font-style: italic !important;
              margin-top: 0.5em !important;
              color: #6B7280 !important;
            }
            .osmd-music-sheet {
              margin: -10px auto 0 !important;
              max-width: 100% !important;
              overflow-x: hidden !important;
              padding: 0 1rem 0.5rem !important;
            }
            #osmdCanvasPage1,
            .osmdCanvasPage {
              max-width: 100% !important;
              overflow-x: hidden !important;
              filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05)) !important;
            }
            .dark .title { color: #F9FAFB !important; }
            .dark .subtitle { color: #D1D5DB !important; }
            .dark .composer { color: #9CA3AF !important; }
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
      // Smaller zoom increments on mobile for finer control
      const increment = isMobile ? 0.05 : 0.1;
      const newZoom = Math.min(zoom + increment, 2);
      setZoom(newZoom);
      osmdInstanceRef.current.zoom = newZoom;
      osmdInstanceRef.current.render();
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  };

  const handleZoomOut = () => {
    if (osmdInstanceRef.current && containerRef.current) {
      const scrollPosition = window.scrollY;
      // Smaller zoom decrements on mobile for finer control
      const decrement = isMobile ? 0.05 : 0.1;
      const minZoom = isXs ? 0.3 : (isSm ? 0.4 : 0.5);
      const newZoom = Math.max(zoom - decrement, minZoom);
      setZoom(newZoom);
      osmdInstanceRef.current.zoom = newZoom;
      osmdInstanceRef.current.render();
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  };
  
  const handleResetZoom = () => {
    if (osmdInstanceRef.current && containerRef.current) {
      const scrollPosition = window.scrollY;
      const defaultZoom = getInitialZoom();
      setZoom(defaultZoom);
      osmdInstanceRef.current.zoom = defaultZoom;
      osmdInstanceRef.current.render();
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 md:px-8 py-2 xs:py-4 sm:py-6"
    >
      {/* Minimalist professional header with zoom controls */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.3 }}
        className="mb-4 sm:mb-6"
      >
        <div className="flex items-center justify-between bg-background rounded-md border border-border/30 shadow-sm p-2.5 sm:p-3">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
            <h2 className="text-sm sm:text-base font-medium text-foreground">Sheet Music Viewer</h2>
          </div>
          
          {/* Zoom controls moved to header */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-1 xs:gap-1.5 bg-background/80 p-1 xs:p-1.5 rounded-full border border-border/20 shadow-sm"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= (isXs ? 0.3 : (isSm ? 0.4 : 0.5))}
              className="h-6 w-6 xs:h-7 xs:w-7 rounded-full bg-transparent transition-all hover:bg-primary/10 hover:text-primary active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              title="Zoom out"
            >
              <span className="sr-only">Zoom out</span>
              <ZoomOut className="h-3 w-3 xs:h-3.5 xs:w-3.5" aria-hidden="true" />
            </Button>
            
            <div className="px-1 xs:px-1.5 min-w-8 xs:min-w-10">
              <span className="block text-center text-[10px] xs:text-xs font-medium select-none" aria-label="Current zoom level">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 2}
              className="h-6 w-6 xs:h-7 xs:w-7 rounded-full bg-transparent transition-all hover:bg-primary/10 hover:text-primary active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              title="Zoom in"
            >
              <span className="sr-only">Zoom in</span>
              <ZoomIn className="h-3 w-3 xs:h-3.5 xs:w-3.5" aria-hidden="true" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleResetZoom}
              disabled={Math.abs(zoom - getInitialZoom()) < 0.05}
              className="h-6 w-6 xs:h-7 xs:w-7 rounded-full bg-transparent transition-all hover:bg-primary/10 hover:text-primary active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              title="Reset zoom"
            >
              <span className="sr-only">Reset zoom</span>
              <RotateCcw className="h-3 w-3 xs:h-3.5 xs:w-3.5" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Card className="bg-background/80 backdrop-blur-lg border-border/30 shadow-lg overflow-hidden">
        <div className="relative">
          {/* Empty top padding for sheet music */}
          <div className="h-2 sm:h-3 w-full bg-background/95 backdrop-blur-md border-b border-border/10"></div>
          
          <CardContent className="p-0 pt-0">
            {/* Loading state */}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex items-center justify-center p-8 xs:p-10 sm:p-16 min-h-[200px] xs:min-h-[300px] sm:min-h-[400px]"
              >
                <div className="space-y-3 xs:space-y-4 text-center">
                  <div className="relative mx-auto">
                    <div className="animate-spin rounded-full h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 border-3 xs:border-4 border-primary/20 border-t-primary" />
                    <Music className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary/70" aria-hidden="true" />
                  </div>
                  <p className="text-sm xs:text-base text-muted-foreground font-medium">Loading sheet music...</p>
                </div>
              </motion.div>
            )}

            {/* Error state */}
            {error && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex items-center justify-center p-8 xs:p-10 sm:p-16 min-h-[200px] xs:min-h-[300px] sm:min-h-[400px]"
              >
                <div className="max-w-[280px] xs:max-w-sm sm:max-w-md space-y-3 xs:space-y-4 text-center px-4">
                  <div className="mx-auto rounded-full bg-destructive/10 p-2 xs:p-3 w-fit">
                    <AlertCircle className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 text-destructive" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-destructive font-medium text-base xs:text-lg mb-1 xs:mb-2">Unable to load sheet music</p>
                    <p className="text-muted-foreground text-sm xs:text-base">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Sheet music container */}
            <div
              ref={containerRef}
              className={cn(
                "relative bg-white dark:bg-card",
                "osmd-container [&_.osmd-music-sheet]:mx-auto [&_svg]:max-w-full",
                "[&_.title]:text-foreground [&_.title]:font-semibold",
                "[&_.subtitle]:text-muted-foreground [&_.subtitle]:font-medium", 
                "[&_.composer]:text-muted-foreground [&_.composer]:italic",
                "dark:[&_svg]:brightness-[1.15]",
                "[&_svg_*]:fill-foreground [&_svg_*]:stroke-foreground",
                "dark:[&_svg_*]:fill-foreground dark:[&_svg_*]:stroke-foreground",
                "p-0 xs:p-1 sm:p-2 md:p-3 lg:p-4",
                "mx-auto max-w-full w-full",
                "overflow-x-auto scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent",
                "transition-all duration-300 ease-in-out",
                "touch-manipulation", // Improves touch behavior on mobile
                isZooming && "will-change-transform", // Performance optimization during zoom
                isLoading && "min-h-[200px] xs:min-h-[300px] sm:min-h-[400px] opacity-0",
                !isLoading && "opacity-100 min-h-[150px] xs:min-h-[200px]"
              )}
            ></div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
