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

	// 1. Filter
	// the first time enter the page the discount value is null
	// we short circuit it with "all"
	const filtervalue = searchParams.get("discount") || "all";

	let filteredCabins;
	if (filtervalue === "all") filteredCabins = cabins;
	if (filtervalue === "no-discount")
		filteredCabins = cabins.filter(cabin => cabin.discount === 0);
	if (filtervalue === "with-discount")
		filteredCabins = cabins.filter(cabin => cabin.discount > 0);

	// 2. Sort
	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	// store the field that the cabins are sorted by and the direction of the sort with destructuring
	const [field, direction] = sortBy.split("-");
	// the modifier will make sure the sorted direction is correct
	const modifier = direction === "asc" ? 1 : -1;
	// sort the filteredCabins with the sort function, since the positive or negative number determine the direction of the sorting, then the modifier is 1 or -1 to help change the direction
	const sortedCabins = filteredCabins.sort((a, b) => modifier * (a[field] - b[field]));

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
					data={sortedCabins}
					render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
