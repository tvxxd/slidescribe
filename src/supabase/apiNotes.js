import supabase from "./supabase";

export async function getNotes(setLoading) {
  try {
    let { data, error } = await supabase.from("notes").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    return [];
  } finally {
    setLoading(false);
  }
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
    callback(false);
  }
}

export async function deleteNotes(id) {
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw error;
}
