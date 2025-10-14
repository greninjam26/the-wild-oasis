import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

/**
 *
 * @returns this is the create cabin form
 */
function CreateCabinForm() {
	// add the react hoot form and obtain the functions
	const { register, handleSubmit, reset } = useForm();

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

	return (
		// in the handleSubmit is the function we want to be called when the form is submitted
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow>
				<Label htmlFor="name">Cabin name</Label>
				{/* by spreading the register allows us to use the library to register each of the input box */}
				<Input type="text" id="name" {...register("name")} />
			</FormRow>

			<FormRow>
				<Label htmlFor="maxCapacity">Maximum capacity</Label>
				<Input type="number" id="maxCapacity" {...register("maxCapacity")} />
			</FormRow>

			<FormRow>
				<Label htmlFor="regularPrice">Regular price</Label>
				<Input type="number" id="regularPrice" {...register("regularPrice")} />
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description for website</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput id="image" accept="image/*" />
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
