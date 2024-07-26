import supabase from "./supabase";

export async function getNotes() {
  let { data, error } = await supabase.from("notes").select("*");

  if (error) {
    return [];
  }

  return data;
}

export async function updateNotes(id, key, value, callback) {
  const payload = { [key]: JSON.stringify(value) };
  const { data, error } = await supabase
    .from("notes")
    .update(payload)
    .eq("id", id);
  if (error) {
    throw error;
  }
  if (callback) {
    callback(true);
  }
}
