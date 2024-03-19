import React from "react";
import { useSelector } from "react-redux";
import { TagsProvider } from "../../hooks/useTags";
import { dataStatus } from "../../slices/officeSlice";
import Loader from "../../components/Loader/Loader";
import Info from "./Info/Info";
import Tags from "./Tags/Tags";
import Links from "./Links/Links";
import Hardware from "./Hardware/Hardware";
import Comments from "./Comments/Comments";


const LeftSection = () => {
	const dataLoadStatus = useSelector(dataStatus);


	return (
		<>
			{(dataLoadStatus === 'loading') && <Loader />}
			{(dataLoadStatus === 'succeeded') &&
				<div id='LeftSection' className="LeftSection">
					<Info />
					<TagsProvider>	<Tags />	</TagsProvider>
					<Links />
					<Hardware />
					<Comments />
				</div>}
		</>
	)
}
export default LeftSection;



