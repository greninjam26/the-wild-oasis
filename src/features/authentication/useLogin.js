import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();

	// we are using a mutation
	// the status of the user changes
	// this way it is also easier to handle
	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: user => {
			navigate("/");
		},
		// this recives the error return by the mutationFn as the input
		onError: err => {
			console.log("ERROR", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoading };
}
