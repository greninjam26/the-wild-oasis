import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
	// get the query client
	const queryClient = useQueryClient();
	// edit an exist cabin
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		// we can only pass one argument if we just put createEditCabin
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully edited");
			// invalidate the data to refresh
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // reset is from react hook form, can't in here
			// clear the form
			// reset();
		},
		onError: err => toast.error(err.message),
	});

	return { isEditing, editCabin };
}
