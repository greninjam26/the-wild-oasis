import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
	// a state that controls whether the form is display or not
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>Filter/Sort</p>
			</Row>

			<Row>
				<CabinTable />

				{/* add a button to toggle the form */}
				<Button onClick={() => setShowForm(show => !show)}>Add new Cabin</Button>
				{/* the form that adds a cabin */}
				{showForm && <CreateCabinForm />}
			</Row>
		</>
	);
}

export default Cabins;
