import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

/**
 *
 * @param {the data of the new cabin that needs to be added to the API} newCabin
 * @returns the data from the new table
 */
export async function createCabin(newCabin) {
	// image format: https://semguujqacuqjryeqzgs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
	// if there are / then supabase will make folders so, we replace them all
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. create the cabin

	// this only works because the the data, newCabin, are the exact format of the table in supabase
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be created ");
	}

	// 2. if it works then upload the image
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// 3. delete the cabin if the uploading returned an error
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"Cabins image could not be uploaded and the cabin can't be created"
		);
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
		throw new Error("Cabins could not be deleted");
	}

	return data;
}
