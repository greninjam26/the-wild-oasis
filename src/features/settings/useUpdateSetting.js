import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
	// get the query client
	const queryClient = useQueryClient();
	// edit an exist Setting
	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		// we can only pass one argument if we just put createEditSetting
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success("Setting successfully updated");
			// invalidate the data to refresh
			queryClient.invalidateQueries({ queryKey: ["settings"] });
			// reset is from react hook form, can't in here
			// clear the form
			// reset();
		},
		onError: err => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
}
