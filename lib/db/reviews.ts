import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface Review {
  id: number;
  name: string;
  item: string;
  rating: number;
  body: string;
  created_at: string;
}

export async function insertReview(data: {
  name: string;
  item: string;
  rating: number;
  body: string;
}): Promise<Review> {
  const { data: row, error } = await supabase
    .from("reviews")
    .insert(data)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return row as Review;
}

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Review[];
}
