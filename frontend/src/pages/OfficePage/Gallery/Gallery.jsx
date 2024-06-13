import React, { useEffect, useMemo, useState } from "react";
import cl from "./Gallery.module.css"
import { useSelector } from "react-redux";
import Lightbox from "../../../components/UI/Lightbox";
import Loader from "../../../components/Loader/Loader"
import MyModal from "../../../components/UI/modal/MyModal";
import ImgUploadDialog from "./ImgUploadDialog";
import Img from "../../../components/UI/img/Img";
import { dataStatus, imgsIds } from "../../../slices/officeSlice";


const Gallery = () => {
	const loadStatus = useSelector(dataStatus);
	const imagesIds = useSelector(imgsIds);
	const [stack, setStack] = useState([]);
	const [visibleImages, setVisibleImages] = useState([]);
	const [modal, setModal] = useState(false);
	const [fileInputDialog, setFileInputDialog] = useState(false)
	const [imgOpen, setImgOpen] = useState();
	const [expanded, setExpanded] = useState(false)



	useEffect(() => {
		imagesIds ? setStack(imagesIds) : false;
		/* 	setVisibleImages(stack.slice(0, 4)); */
	}, [imagesIds])

	useEffect(() => {
		/* const currentPreview = imagesIds.map(img => img._id);  */
		(imagesIds && stack) ? setVisibleImages(stack.slice(0, 4)) : false;
	}, [/* imagesIds,  */stack]
	);

	const forward = () => {
		if (imagesIds.length <= 4) return;
		let arr = [...stack];
		let x = arr.shift();
		arr.push(x);
		console.log('forward, stack:', stack)
		setStack(arr);
	}
	const back = () => {
		if (imagesIds.length <= 4) return;
		let arr = [];
		arr = [...stack];
		let x = arr.pop();
		arr.unshift(x);
		console.log('back,stack:', stack)
		setStack(arr);
	}
	const showMore = () => {
		setExpanded(true);
		setVisibleImages(stack);
	}
	const collapse = () => {
		setExpanded(false);
		setVisibleImages(stack.slice(0, 4))
	}

	const gall = useMemo(() => {
		return (visibleImages.map(img => {
			return (
				<Img
					imgId={img}
					key={img}
					onClick={() => {
						setImgOpen(img);
						setModal(true);
					}}
					className={cl.masonry__brick}
					loading="lazy" alt=""
				/>)
		}))
	}, [visibleImages, stack])


	return (
		<><div className={cl.gallery} >

			{(loadStatus === 'loading') && <Loader />}
			{(loadStatus === 'succeeded') && <div className={cl.mansory}>
				{gall} </div>}



			<div className={cl.btns__wrap}>

				<div className={cl.btns + " " + cl.btns__back}
					onClick={() => back()}
				>	navigate_before	</div>

				{expanded && (
					<div className={cl.btns + " " + cl.btns__more}
						onClick={() => collapse()}
					>	expand_less	</div>)}

				{!(expanded) && (
					<div className={cl.btns + " " + cl.btns__less}
						onClick={() => showMore()}
					>	unfold_more	</div>)}

				<div className={cl.btns + " " + cl.btns__forward}
					onClick={() => forward()}
				>	navigate_next	</div>

				<div className={cl.btns + " " + cl.btns__add}
					onClick={() => setFileInputDialog(true)}
				>	photo_camera	</div>

			</div>

			{imgOpen &&
				<MyModal visible={modal} setVisible={setModal}>
					<Lightbox imgId={imgOpen} setVisible={setModal} />
				</MyModal>}

		</div>

			{fileInputDialog ? <ImgUploadDialog setVisible={setFileInputDialog} /> : false}
		</>
	)
}

export default Gallery;
