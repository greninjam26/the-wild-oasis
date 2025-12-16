import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: bookingId =>
			updateBooking(bookingId, { status: "checked-in", isPaid: true }),
		// after successfully check in the client
		// this also recives the data that is returned by the mutationFn
		onSuccess: data => {
			toast.success(`Booking #${data.id} successfully checked in`);
			// this will invalidate all the queries that is current on the page
			// with active:true, this way we don't need to remember the query keys
			queryClient.invalidateQueries({ active: true });
			// return to homepage
			navigate("/");
		},
		// if the mutation result in error
		onError: () => toast.error("there is an error while checking in"),
	});

	return { checkin, isCheckingIn };
}
