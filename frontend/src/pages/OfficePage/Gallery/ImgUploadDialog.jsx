import React, { useRef, useState } from "react";
import axios from "axios";
import cl from "./Gallery.module.css"
import { useOffice } from "../../../hooks/useOffice";
import { useSelector } from "react-redux";
import { dataLoaded, numb } from "../../../slices/officeSlice";
import store from "../../../store";

const { REACT_APP_BASE_URL } = process.env

const ImgUploadDialog = ({ setVisible }) => {
	const { currentOffice } = useOffice();
	const currentOfficeNumb = useSelector(numb);
	const [files, setFiles] = useState('');
	const ir = useRef(null);
	const filesArray = files ? [...files] : [];

	const submit = async event => {

		event.preventDefault();
		const formData = new FormData();
		filesArray.forEach(file => formData.append('image', file, currentOfficeNumb))
		formData.append("office", currentOfficeNumb);

		await axios.post(`${REACT_APP_BASE_URL}/api/office/${currentOffice}/img`,
			formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
			enctype: "multipart/form-data",
			data: formData
		}).then(res => store.dispatch(dataLoaded(res.data)))

		setVisible(false)
	}

	function showPicked() {
		console.log('f f ff iles lenght', ir.current.value);
		let len = 8
		let i = 0;
		filesArray.lenght;
		while (i < len) {
			console.log(ir.current.files?.item(i)?.name);
			i++
		}
	};
	/* const FileList = useCallback(() => {
				let l = filesArray.lenght;
					return (
						<span>{l} файлов</span>) 
			}, [files]); */

	return (
		<>
			<div className={cl.emptyGallwrap} style={{ zIndex: 2 }}>
				{files /* && <FileList />  */ && ir.current.files.lenght}

				<form
					encType="multipart/form-data"
					method="post"
					className={cl.uploadForm}
					onSubmit={submit} >

					<label
						htmlFor="file-upload"
						className={cl.btns__add_label}>
						Выбрать
					</label>
					<input
						ref={ir}
						type="file" multiple
						onChange={e => {
							setFiles(e.target.files);
							showPicked(); console.log('files.item[0]', ir.current.files);
						}}
						id="file-upload"
						placeholder="выберите файл"
						className="MyFileinput" />
					<button type="submit" className={cl.btns} > upload </button>
				</form>


			</div>
		</>
	)
}

export default ImgUploadDialog;