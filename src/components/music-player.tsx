import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface MusicPlayerProps {
  playlistId: string;
}

export function MusicPlayer({ playlistId }: MusicPlayerProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // YouTube playlist embed URL (works for both YouTube and YouTube Music playlists)
  const embedUrl = `https://www.youtube.com/playlist?list=${playlistId}&autoplay=0&loop=1&rel=0&showinfo=0`;

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const togglePlayer = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closePlayer = () => {
    setIsOpen(false);
    setIsPlaying(false);
  };

  return (
    <>
      {/* Floating Music Button */}
      {!isOpen && (
        <button
          onClick={togglePlayer}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-content rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
          aria-label={t("music.openPlayer", "Open Music Player")}
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </button>
      )}

      {/* Music Player Panel */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? "bottom-6 right-6 w-72 h-16"
              : "bottom-6 right-6 w-96 h-96"
          }`}
        >
          <div className="bg-background border-2 border-primary/50 rounded-lg shadow-2xl overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="bg-primary/10 border-b border-primary/30 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("music.player", "Music Player")}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMinimize}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-primary/20 transition-colors text-foreground"
                  aria-label={
                    isMinimized
                      ? t("music.expand", "Expand")
                      : t("music.minimize", "Minimize")
                  }
                >
                  {isMinimized ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={closePlayer}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-primary/20 transition-colors text-foreground"
                  aria-label={t("music.close", "Close")}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Player Content */}
            {!isMinimized && (
              <div className="flex-1 p-4">
                <iframe
                  ref={playerRef}
                  className="w-full h-full rounded"
                  src={embedUrl}
                  title="YouTube Music Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Minimized Info */}
            {isMinimized && (
              <div className="flex-1 flex items-center px-4 py-2">
                <p className="text-sm text-foreground/70">
                  {t("music.playlistActive", "Playlist active")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
