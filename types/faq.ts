export type FaqEntry = {
  id: string | number;
  question?: string | null;
  answer_text?: string | null;
  answer_html?: string | null;
  category?: string | null;
  page?: string | null;
  source_url?: string | null;
  anchor?: string | null;
  tags?: string[] | null;
  updated_at?: string | null;
  created_at?: string | null;
};
