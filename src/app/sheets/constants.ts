export const SUPPORTED_LANGUAGES = [
  { code: "bg", name: "Bulgarian" },
  { code: "de", name: "German" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
] as const;

export const TABS = [
  {
    id: "back",
    label: "",
    icon: "ArrowLeft",
  },
  {
    id: "sheet",
    label: "Viewer",
    icon: "ListMusic",
  },
  {
    id: "lyrics",
    label: "Lyrics",
    icon: "FileText",
  },
  {
    id: "player",
    label: "Player",
    icon: "PlayCircle",
  },
  {
    id: "info",
    label: "Info",
    icon: "Info",
  },
] as const;
