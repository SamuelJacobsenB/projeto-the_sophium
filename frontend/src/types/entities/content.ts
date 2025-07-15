export interface Content {
  id: string;
  module_id: string;
  title: string;
  video_url: string | null;
  file_id: string | null;
  file: File | null;
  html: string | null;
  order: number;
  created_at: Date;
  updated_at: Date;
}
