import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		// with options in data we can store any information we want related to the user
		options: { data: { fullName, avatar: "" } },
	});

	if (error) throw new Error(error.message);

	return data;
}

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

export async function logout() {
	// this doesn't return any data
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
	// 1. Update password OR fullName(can't do two at the same time, they are in different forms)
	let updateData;
	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } };

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);
	if (!avatar) return data;

	// 2. Upload the avatar image
	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);
	if (storageError) throw new Error(storageError.message);

	// 3. Update the avatar in the user
	const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});
	if (error2) throw new Error(error2.message);

	return updatedUser;
}
