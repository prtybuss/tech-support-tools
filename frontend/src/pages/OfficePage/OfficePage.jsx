import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOffice } from "../../hooks/useOffice";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const OfficePage = () => {
	const { officeId } = useParams();
	const { getOfficeDetails } = useOffice();

	useEffect(() => {
		getOfficeDetails(officeId)
	}, [officeId])


	return (
		<>
			<LeftSection />
			<RightSection />
		</>
	)
}
export default OfficePage;