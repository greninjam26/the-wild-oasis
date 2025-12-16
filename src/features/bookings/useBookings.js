import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();

	// Filter
	const filterValue = searchParams.get("status");
	const filter =
		// if there are not filterValue or it is "all"
		// then set the filter to null
		// else field the status and the filterValue is the value that is the bookings are being sorted by
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	// Sort
	const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		// this set that the query is depended on and will refetches the data when one of them changes
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	});

	return { isLoading, bookings, error };
}
