import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

/**
 *
 * @param {the cabin that we will be editing} cabinToEdit
 * @returns the form to edit or create cabin
 */
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	// create new cabin
	const { isCreating, createCabin } = useCreateCabin();
	// edit an exist cabin
	const { isEditing, editCabin } = useEditCabin();
	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	// add the react hook form and obtain the functions
	// with defaultValues to set the values in the input box for editing purposes
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	/**
	 *
	 * @param {this is the data received from the form} data
	 */
	function onSubmit(data) {
		// check is the image is a link or file list
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		// this way we only take the image and nothing else(upload a file have a lot of other imformations)
		// data.image is a file list so .at() won't work, it is not a real array
		// for the mutation, we don't have to put the functions in the mutation function, we can also have it here, where the mutation is called
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
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
		<Form
			onSubmit={handleSubmit(onSubmit)}
			// we can use wether onCloseModal function exist or not to check if the form is in a Modal Window or not. Then change the style accordingly.
			type={onCloseModal ? "modal" : "regular"}
		>
			{/* through optional chaining ?. to check if this field have an error, if it does if it have a message, if it does pass in the message */}
			<FormRow label="Cabin name" error={errors?.name?.message}>
				{/* by spreading the register allows us to use the library to register each of the input box */}
				<Input
					type="text"
					id="name"
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						// this set the input box to must be filled in to submit
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					disabled={isWorking}
					{...register("image", {
						// this set the input box to must be filled in to submit if we are not editing the cabin
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				{/* is reset from HTML we can easier make a button that clears the form */}
				<Button
					variation="secondary"
					type="reset"
					// we might not have the onCloseModal props when the form is not in a Modal Window.
					// To prevent the error, we call it in another function with optional chaining to check if the function exist or not.
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				{/* use conditions to change the name of the button */}
				<Button disabled={isWorking}>
					{isEditSession ? "Edit" : "Create new"} cabin
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
