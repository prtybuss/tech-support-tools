import React from "react";
import cl from './Loader.module.css'

const Loader = () => {

	return (
		<div className="centred_content">

			<div className={cl.Loader}>

			</div >
		</div>

		/* 	<div class={cl.Loader} style="--b: 15px;--c: blue;width: 120px;--n: 8"></div>
			<div class={cl.Loader} style="--b: 5px;--c: green;width: 80px;--n: 6;--g: 20deg"></div>
			<div class={cl.Loader} style="--b: 20px;--c: #000;width: 80px;--n: 15;--g: 7deg"></div>  */
	)
}
export default Loader;