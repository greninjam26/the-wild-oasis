import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		// this is an unique key that identifies the query
		queryKey: ["cabins"],
		// this function will be doing the fetching of the data and need to return a promise
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
}
