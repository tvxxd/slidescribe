import supabase from "./supabase";

export async function getNotes() {
  let { data, error } = await supabase.from("notes").select("*");

  if (error) {
    return [];
  }

  return data;
}
