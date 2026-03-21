import supabase from "../supabaseClient";

export const getImageUrl = (filePath: string | undefined | null): string | null => {
  if (!filePath) return null;

  const { data } = supabase
    .storage
    .from("images")
    .getPublicUrl(filePath);

  return data.publicUrl || null;
}