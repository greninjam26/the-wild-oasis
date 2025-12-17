import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
      // even if we logged out, the data is still soted in the query cache
      // with this we can clear the query cache
      // we can also specify which one to clear, in this case is not necessary
			queryClient.removeQueries();
			// this will erase where we were earlier
			// without this replace, the back button in the browser won't work
			navigate("/login", { replace: true });
		},
	});

	return { logout, isLoading };
}
