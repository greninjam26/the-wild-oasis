import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
	// get the value of bookingId from the URL
	const { bookingId } = useParams();

	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ["booking"],
		// the function just call getBooking with the id of the current Booking
		queryFn: () => getBooking(bookingId),
		// stop React Query trying to fetch the data three times when the first try failed
		// in this case when the first time it fails, the data probably don't exist
		retry: false,
	});

	return { isLoading, booking, error };
}
