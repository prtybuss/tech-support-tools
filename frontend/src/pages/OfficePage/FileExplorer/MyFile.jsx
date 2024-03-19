import React from "react";
import cl from './FileExplorer.module.css'


const MyFile = ({ name, size, isDirectory, date, setPlay, setCurrentPath }) => {

	if (isDirectory === true) {
		return (
			<div className={cl.file}>


				<span className={cl.icon}>
					folder
				</span>

				<span className={cl.filename}
					onClick={() => {
						setCurrentPath(name);
						setPlay('')
					}}>
					{name}
				</span>


			</div>
		)
	} else {
		return (
			<div className={cl.file}>


				<span className={cl.icon}>
					audio_file
				</span>

				<span
					className={cl.filename}
					onClick={() => setPlay(name)}>
					{name}
				</span>


				<span className={cl.date}>
					{date}
				</span>

				<span className={cl.size}>
					{size}
				</span>


			</div>
		)
	}
}
export default MyFile;
