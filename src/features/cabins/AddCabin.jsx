import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
	return (
		<div>
			{/* we don't want this AddCabin component to keep track of wether or not the
			Modal Window is open, so we need Compound Component Pattern for this to make
			the Modal keep track of this itself */}
			<Modal>
				{/* we don't make this a button to keep the Modal flexiable and allow the user to pass in any button their want */}
				<Modal.Open opens="cabin-form">
					{/* add a button to toggle the form */}
					<Button>Add new Cabin</Button>
				</Modal.Open>
				{/* this is the part of the modal window that has a form, which adds a cabin, passed in as a children props */}
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// function AddCabin() {
//   // we don't want this AddCabin component to keep track of wether or not the Modal Window is open, so we need Compound Component Pattern for this to make the Modal keep track of this itself
// 	// a state that controls whether the modal window is open or not
// 	const [isOpenModal, setIsOpenModal] = useState(false);
// 	return (
// 		<div>
// 			{/* add a button to toggle the form */}
// 			<Button onClick={() => setIsOpenModal(show => !show)}>Add new Cabin</Button>
// 			{/* this is the modal window that has a form, which adds a cabin, passed in as a children props */}
// 			{isOpenModal && (
// 				// the onClose props will pass in the function that will close the Modal Window
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default AddCabin;
