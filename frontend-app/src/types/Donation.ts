export interface Donation {
  _id: string;
  authorId: string;
  category: "Furniture" | "Electronics" | "Clothes" | "all";
  description: string;
  location: string;
  zone: "North" | "Center" | "South" | "all";
  media: string[];
  ownerPhone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
