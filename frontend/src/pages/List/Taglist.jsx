import React from "react";
import classes from './Taglist.module.css';
import TaggedItems from "./TaggedItems";
import UntaggedItems from "./UntaggedItems";



function Taglist() {


	return (
		<div className={classes.listwrap}>
			<TaggedItems />
			<UntaggedItems />
		</div>
	)
}

export default Taglist;
