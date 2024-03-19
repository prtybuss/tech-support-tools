import React from "react";
import { Route, Routes } from "react-router-dom";
import TagsBlock from "../components/TagsBlock/TagsBlock";
import Taglist from "./List/Taglist";
import OfficePage from "./OfficePage/OfficePage";
import { TagsProvider } from "../hooks/useTags";
import { OfficeProvider } from "../hooks/useOffice";


const Dashboard = () => {

	return (
		<>
			<OfficeProvider>

				<TagsProvider>	<TagsBlock />	</TagsProvider>

				<Routes>
					<Route exact path=":officeId" element={<OfficePage />} />
					<Route exact path="list/:tagId" element={<TagsProvider> <Taglist /> </TagsProvider>} />
				</Routes>

			</OfficeProvider>
		</>)
}
export default Dashboard;
