import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

/**
 *
 * @returns this is the create cabin form
 */
function CreateCabinForm() {
	// add the react hoot form and obtain the functions
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	// get the query client
	const queryClient = useQueryClient();

	// mutates the data
	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");
			// invalidate the data to refresh
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			// clear the form
			reset();
		},
		onError: err => toast.error(err.message),
	});

	/**
	 *
	 * @param {this is the data received from the form} data
	 */
	function onSubmit(data) {
		mutate(data);
	}

	/**
	 * not useful right now the error display is handled by the formState
	 * @param {the errors returned when submition of the form fail} errors
	 */
	// function onError(errors) {
	// console.log(errors);
	// }

	return (
		// in the handleSubmit, the first function(onSubmit) is what we want to be called when the form is submitted, the second function(obError) will be called when the form returns an error when submitted
		<Form onSubmit={handleSubmit(onSubmit)}>
			{/* through optional chaining ?. to check if this field have an error, if it does if it have a message, if it does pass in the message */}
			<FormRow label="Cabin name" error={errors?.name?.message}>
				{/* by spreading the register allows us to use the library to register each of the input box */}
				<Input
					type="text"
					id="name"
					disabled={isCreating}
					{...register("name", {
						// the strings are the error messages return when the condition fail

						// this set the input box to must be filled in to submit
						// by returning an error when submitting the form with this field empty
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
					{...register("maxCapacity", {
						// this set the input box to must be filled in to submit
						required: "This field is required",
						// we can set minimum values required for this field
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreating}
					{...register("regularPrice", {
						// this set the input box to must be filled in to submit
						required: "This field is required",
						// we can set minimum values required for this field
						min: {
							value: 1,
							message: "Regular price should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isCreating}
					defaultValue={0}
					{...register("discount", {
						// this set the input box to must be filled in to submit
						required: "This field is required",
						// we can customize our own validation functions
						/**
						 *
						 * @param {the value of the input field} value
						 * @returns true for the input is valid and return an error or message
						 */
						validate: value =>
							value <= getValues().regularPrice ||
							"discount should be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow label="Description for website" error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isCreating}
					defaultValue=""
					{...register("description", {
						// this set the input box to must be filled in to submit
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput id="image" accept="image/*" disabled={isCreating} />
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				{/* is reset from HTML we can easier make a button that clears the form */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
