import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	// we are using a mutation
	// the status of the user changes
	// this way it is also easier to handle
	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: user => {
			// this allow us to manually set data into React Query Cache
			// this way after login we don't need to refetch the user data that is just fetched
			// this makes the login a bit faster
			// but this doesn't seem to stop it from refetching...
			queryClient.setQueryData(["user"], user.user);
			// this will erase where we were earlier
			// without this replace, the back button in the browser won't work
			navigate("/dashboard", { replace: true });
		},
		// this recives the error return by the mutationFn as the input
		onError: err => {
			console.log("ERROR", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoading };
}
