// src/types/index.ts
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  significance?: string;
}

export interface Quote {
  text: string;
  author: string;
  designation: string;
}

export interface Highlight {
  label: string;
  value: string;
}

export interface CommandingOfficer {
  name: string;
  rank: string;
  tenure: string;
  bio: string;
  contribution: string;
  image: string;
}

export interface GaonBura {
  name: string;
  tribe: string;
  era: string;
  role: string;
  contribution: string;
}

export interface Achievement {
  category: string;
  title: string;
  description: string;
  year: string;
  icon: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  category: string;
  year: string;
  history?: string;
}

export interface VideoItem {
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  year: string;
  featured: boolean;
  videoUrl?: string;
}

export interface UnitData {
  meta: Record<string, string | string[]>;
  history: {
    overview: string;
    paragraphs: string[];
    timeline: TimelineEntry[];
    quotes: Quote[];
    highlights: Highlight[];
  };
  commandingOfficers: CommandingOfficer[];
  gaonBuras?: GaonBura[];
  achievements: Achievement[];
  gallery: GalleryItem[];
  videos: VideoItem[];
}
