import React from 'react'
import { useSelector } from 'react-redux';
import { selectPreloaded } from '../slices/loaderSlice';
import NavSearchCategory from './NavSearchCategory';

export default function NavSearch() {
	const params = useSelector(selectPreloaded);
	const fields = ['ip', 'adress', 'numb'];

	return (
		<>
			{fields.map(cat => {
				return (
					<NavSearchCategory key={cat} name={cat} data={params[cat]} />)
			})}
		</>
	)
}
