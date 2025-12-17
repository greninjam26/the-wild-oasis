import supabase from "./supabase";

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) throw new Error(error.message);

	// the data return is just a auth token that tells that server the user is authenticated
	// supabase store this stoken in Local Storage
	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	// we are redownloading the data from supabase so it is more secure than getting it from the session
	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

  // we don't really care about the session in the data
	return data?.user;
}
