import { Mic, Music2, Piano } from "lucide-react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { MusicSheet } from "../actions";
import "react-h5-audio-player/lib/styles.css";

interface SheetAudioPlayerProps {
  sheet: MusicSheet | undefined;
}

export function SheetAudioPlayer({ sheet }: SheetAudioPlayerProps) {
  return (
    <div className="p-2 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Vocal Track */}
        {sheet?.audio?.vocal?.url && (
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Vocal Version
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {sheet.audio.vocal.description}
            </p>
            <div className="audio-container">
              <AudioPlayer
                className="rhap_custom-player"
                autoPlay={false}
                src={sheet.audio.vocal.url}
                onPlay={(e) => {
                  const audio = e.target as HTMLAudioElement;
                  audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                  });
                }}
                showJumpControls={true}
                showSkipControls={true}
                hasDefaultKeyBindings={true}
                layout="horizontal"
                customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
              />
            </div>
          </div>
        )}

        {/* Instrumental Track */}
        {sheet?.audio?.instrumental?.url && (
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <Music2 className="h-4 w-4" />
              Instrumental Version
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {sheet.audio.instrumental.description}
            </p>
            <div className="audio-container">
              <AudioPlayer
                className="rhap_custom-player"
                autoPlay={false}
                src={sheet.audio.instrumental.url}
                onPlay={(e) => {
                  const audio = e.target as HTMLAudioElement;
                  audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                  });
                }}
                showJumpControls={true}
                showSkipControls={true}
                hasDefaultKeyBindings={true}
                layout="horizontal"
                customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
              />
            </div>
          </div>
        )}

        {/* Piano Track */}
        {sheet?.audio?.piano?.url && (
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <Piano className="h-4 w-4" />
              Piano Version
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {sheet.audio.piano.description}
            </p>
            <div className="audio-container">
              <AudioPlayer
                className="rhap_custom-player"
                autoPlay={false}
                src={sheet.audio.piano.url}
                onPlay={(e) => {
                  const audio = e.target as HTMLAudioElement;
                  audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                  });
                }}
                showJumpControls={true}
                showSkipControls={true}
                hasDefaultKeyBindings={true}
                layout="horizontal"
                customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
              />
            </div>
          </div>
        )}

        {/* No Audio Available Message */}
        {!sheet?.audio?.vocal?.url &&
          !sheet?.audio?.instrumental?.url &&
          !sheet?.audio?.piano?.url && (
            <div className="text-center text-muted-foreground py-8">
              <Music2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No audio tracks available for this sheet music.</p>
            </div>
          )}
      </div>
    </div>
  );
}
