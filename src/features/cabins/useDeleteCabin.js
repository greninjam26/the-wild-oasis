import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
	// this allows us to get the query client from the app.jsx file to make the data invalid
	const queryClient = useQueryClient();

	// the mutate the data from the API
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		// this is the function that is called
		mutationFn: deleteCabinApi,
		// to refetch the data, we need to revalidate the data
		onSuccess: () => {
			toast.success("Cabin successfully deleted");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}
