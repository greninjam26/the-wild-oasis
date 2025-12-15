import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	// the first time enter the page the discount value is null
	// we short circuit it with "all"
	const filtervalue = searchParams.get("discount") || "all";

	let filteredCabins;
	if (filtervalue === "all") filteredCabins = cabins;
	if (filtervalue === "no-discount")
		filteredCabins = cabins.filter(cabin => cabin.discount === 0);
	if (filtervalue === "with-discount")
		filteredCabins = cabins.filter(cabin => cabin.discount > 0);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				{/* with Render Props Pattern we don't need to render the rows here, we can tell the Table.Body what to do */}
				<Table.Body
					data={filteredCabins}
					render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
