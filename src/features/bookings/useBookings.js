import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();
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

	// Pagination
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	// Query
	const {
		isLoading,
		// instead of just passing the data in and destructure after the data is fetched
		// we can just set it to {}, and it works after
		data: { data: bookings, count } = {},
		// data,
		error,
	} = useQuery({
		// this set that the query is depended on and will refetches the data when one of them changes
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// Pre-Fetching
	// fetch the data to the next page before hand so that user don't get a loading spinner every page
	const pageCount = Math.ceil(count / PAGE_SIZE);
	// check to make sure we don't fetch data for a page that doesn't exist
	// fetch the next page
	if (page < pageCount)
		queryClient.prefetchQuery({
			// this set that the query is depended on and will refetches the data when one of them changes
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});
	// fetch the page before
	if (page > 1)
		queryClient.prefetchQuery({
			// this set that the query is depended on and will refetches the data when one of them changes
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, bookings, error, count };
	// return { isLoading, error, data };
}
