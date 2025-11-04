type AnnounceType = "job" | "event";

export type AnnouncementData = {
  id: number;
  title: string;
  desc: string;
  clubName : string;
  created_at : string;
  deadline?: Date;
  announceType : AnnounceType;
}