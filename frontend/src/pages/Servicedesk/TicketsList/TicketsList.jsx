import React, { useMemo, useState } from "react";
import classes from './TicketsList.module.css';
import { useSelector } from "react-redux";
import { ticketsSelector } from "../../../slices/ticketSlice";
import TicketsListElement from "./TicketsListElement";
import Select from "../../../components/UI/select/Select";
import Filters from "./Filters";

const TicketsList = () => {
	const tickets = useSelector(ticketsSelector.selectAll);
	const [selectedSort, setSelectedSort] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const sortedTickets = useMemo(() => {
		if (selectedSort) {
			return [...tickets].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
		}
		return tickets;
	}, [tickets, selectedSort]);

	const filtredSortedTickets = useMemo(() => {
		if (statusFilter) {
			return [...sortedTickets].filter(t => t.status === statusFilter)
		}
		return sortedTickets;
	}, [tickets, statusFilter, selectedSort]);

	const listComponents = useMemo(() => {
		if (selectedSort || statusFilter) {
			return filtredSortedTickets.map(t => <TicketsListElement {...t} />)
		} else return (tickets.map(t => <TicketsListElement {...t} />))
	}, [tickets, selectedSort, statusFilter]);

	return (
		<>
			<div className={classes.list_wrap}>

				<div className={classes.le_sort}>
					<div>
						<Select
							value={selectedSort}
							onChange={sort => setSelectedSort(sort)}
							defaultValue="sort"
							options={[
								{ value: 'theme', name: 'тема' },
								{ value: 'authorName', name: 'автор' },
								{ value: 'updated', name: 'обновлен' },
							]}
							className={classes.le_sort__sorttype} />
					</div>
					<div className={classes.filters}>
						<Filters
							currentFilter={statusFilter}
							className={classes.filter_option}
							classNameForCurrent={classes.filter_option_current}
							onClick={filter => setStatusFilter(filter)}
							options={[
								{ value: '', name: 'все' },
								{ value: 'new', name: 'новые' },
								{ value: 'proceed', name: 'в обработке' },
								{ value: 'closed', name: 'закрытые' },
							]} />
					</div>
				</div>




				<div className={classes.list}>
					{listComponents}
				</div>

			</div>
		</>
	)
}

export default TicketsList;