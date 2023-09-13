export const postCategories = {
  Coding: "Coding" as const,
  Food: "Food" as const,
  Style: "Style" as const,
  Travel: "Travel" as const,
  Relationships: "Relationships" as const,
  Other: "Other" as const
}

export type Category = keyof typeof postCategories;

export interface Reactions {
  thumbsUp: number,
  love: number,
  angry: number,
  sad: number,
  thinking: number,
  surprised: number
}

export interface Post {
  id: string,
  title: string,
  content: string,
  userId: string,
  date: string,
  category: Category,
  reactions: Reactions
}