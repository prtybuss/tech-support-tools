import React, { useRef, useState } from "react";
import axios from "axios";
import { useOffice } from "../../../hooks/useOffice";
import { useSelector } from "react-redux";
import { numb } from "../../../slices/officeSlice";


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
		await axios.post(`http://192.168.88.16:5000/api/office/${currentOffice}/img`,
			formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
			enctype: "multipart/form-data",
			data: formData
		}).then(setVisible(false))
	}

	/*   function showPicked() {
			console.log('f f ff iles lenght', ir.current.value);
			let len = 8
			let i = 0;
			filesArray.lenght;
			while (i < len) {
				console.log(ir.current.files.item(i).name);
				i++
			}
		}; */
	/* const FileList = useCallback(() => {
				let l = filesArray.lenght;
					return (
						<span>{l} файлов</span>) 
			}, [files]); */

	return (
		<>
			<div className="ImgUploadDialog" style={{ zIndex: 2 }}>
				{files /* && <FileList />  */ && ir.current.files.lenght}

				<form
					encType="multipart/form-data"
					method="post"
					onSubmit={submit} >

					<input ref={ir}
						type="file" multiple
						onChange={e => {
							setFiles(e.target.files);
							/* showPicked();console.log('files.item[0]',ir.current.files); */
						}}
						placeholder="выберите файл"
						className="MyFileinput" />
					<button type="submit" className="link" > Ok! </button>
				</form>


			</div>
		</>
	)
}

export default ImgUploadDialog;