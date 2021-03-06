/* Categories */
export interface Meta {
  season: string;
}

export interface ICategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  created: number;
  updated: number;
  meta: Meta;
  assets: any[];
  children: any[];
}

export interface ICategories {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string;
  categories: ICategory[];
}
