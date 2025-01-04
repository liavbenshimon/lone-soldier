export interface EatUp {
  _id: string;
  title: string;
  description: string;
  zone: string;
  date: string;
  kosher: boolean;
  hosting: string;
  media: string[];
  phone?: string;
  guests?: string[];
  limit?: number;
  authorId: string;
  owner: string;
  language: string;
}
