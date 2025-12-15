import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
	// a state that controls whether the modal window is open or not
	const [isOpenModal, setIsOpenModal] = useState(false);
	return (
		<div>
			{/* add a button to toggle the form */}
			<Button onClick={() => setIsOpenModal(show => !show)}>Add new Cabin</Button>
			{/* this is the modal window that has a form, which adds a cabin, passed in as a children props */}
			{isOpenModal && (
				// the onClose props will pass in the function that will close the Modal Window
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
				</Modal>
			)}
		</div>
	);
}

export default AddCabin;
