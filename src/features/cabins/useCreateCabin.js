import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
	// get the query client
	const queryClient = useQueryClient();

	// mutates the data
	// create new cabin
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");
			// invalidate the data to refresh
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // reset is from react hook form, can't in here
			// clear the form
			// reset();
		},
		onError: err => toast.error(err.message),
	});

	return { isCreating, createCabin };
}
