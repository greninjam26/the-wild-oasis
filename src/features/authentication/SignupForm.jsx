import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { signup, isLoading } = useSignup();
	// use react hook form to help manage this form
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;

	function onSubmit({ fullName, email, password }) {
		signup(
			{ fullName, email, password },
			{
				onSettled: () => {
					reset();
				},
			}
		);
	}

	return (
		// handleSubmit will recive the function that we want to execute when the form is submitted
		// then when the form is submitted, the function will be executed
		// the function will also receive all data from the form fields
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label="Full name"
				// this will check if errors have fullName, if it have a message
				// if it does, then display the message
				error={errors?.fullName?.message}
			>
				<Input
					type="text"
					id="fullName"
					disabled={isLoading}
					// set the field name as fullName, and required:"message" sets that this field must to filled and display the message when it is not filled
					// this allows react hook form to manage this field
					// register create a few props, then we just spread them to the Input field
					{...register("fullName", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					disabled={isLoading}
					{...register("email", {
						required: "This field is required",
						pattern: {
							// this regex will check if the email is valid or not(I think just checking the format though)
							value: /\S+@\S+\.\S+/,
							message: "Please provide a valid email address",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					disabled={isLoading}
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password needs a minimum of 8 characters",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isLoading}
					{...register("passwordConfirm", {
						required: "This field is required",
						// this is a custom validate function
						// the value the function recives is the value of this field
						validate: value =>
							// with getValues from react hook form we can obtain the value in the password field
							value === getValues().password || "Passwords need to match",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variations="secondary" type="reset" disabled={isLoading}>
					Cancel
				</Button>
				<Button disabled={isLoading}>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
