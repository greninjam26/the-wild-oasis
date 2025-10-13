import supabase from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

// deleting a cabin from the API(mutating) with React Query
/**
 * 
 * @param {the id of the cabin that we want to delete} id 
 * @returns this return the result table after deleting the cabin
 */
export async function deleteCabin(id) {
	// this take the table form supabase matches the cabin and the input id
	// then delete the cabin from the table
	// if the row level security is on, need to create new policy to allow edit
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}
