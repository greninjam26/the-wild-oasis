import supabase from "./supabase";

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) throw new Error(error.message);

  // the data return is just a auth token that tells that server the user is authenticated
  // supabase store this stoken in Local Storage
	return data;
}
