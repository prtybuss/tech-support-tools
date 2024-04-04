import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import cl from './FileExplorer.module.css'
import { useSelector } from "react-redux";
import MyFile from "./MyFile";
import Loader from "../../../components/Loader/Loader";
import { filesStatus, selectFiles, selectFolders } from "../../../slices/files";
import { useOffice } from "../../../hooks/useOffice";
import { selectUserById, selectUsers } from "../../../slices/officeSlice";
import { useParams } from "react-router-dom";
const { REACT_APP_BASE_URL } = process.env

const controller = new AbortController();

const getAudio = async (currentOffice, currentUser, file) => {
	let resp = await axios.get(`${REACT_APP_BASE_URL}/api/office/${currentOffice}/${currentUser}/listen/${file}`, {
		responseType: 'blob',
		signal: controller.signal
	})
		.catch(function (error) {
			console.log(Error.message);
		})
	return URL.createObjectURL(resp.data);
};

const FileExplorer = () => {
	const { officeId } = useParams();
	const folders = useSelector(selectFolders)
	const files = useSelector(selectFiles);
	const dataStatus = useSelector(filesStatus);

	const [nowPlaying, setNowPlaying] = useState('');
	const [currentPath, setCurrentPath] = useState('');
	const player = useRef();
	const [audioSrc, setAudioSrc] = useState();
	const { watchDir, currentOffice } = useOffice();
	const users = useSelector(selectUsers);
	/* фильтр по юзеру */
	const [currentUser, setCurrentUser] = useState(users?.[0])

	useEffect(() => {
		setNowPlaying(''); setCurrentPath(''); controller.abort();
	}, [officeId])

	useEffect(() => {
		if (currentOffice) watchDir({ userId: currentUser?._id, subfolder: (currentPath ?? '') });
	}, [/* currentOffice, */ currentUser?._id, currentPath])


	const play = (fileName) => {
		setNowPlaying(fileName);
		if (fileName) {
			const file = currentPath ? currentPath + '/' + fileName : fileName
			getAudio(currentOffice, currentUser, file).then((url) => setAudioSrc(url));
		}
	};

	const pickAnotherUser = (user) => {/* 
		const { login, _id } = users.find(u => u._id === e.target.id) */
		console.log('user', user._id);
		setCurrentUser(user);
	}

	return (
		<div className={cl.explorer}>
			{currentUser?.login}
			<div className={cl.explorer_header}>
				{users.map(user => {
					return (
						<div
							onClick={() => pickAnotherUser(user)}
							className={
								currentUser?._id === user._id
									? cl.explorer_header__options_item_current
									: cl.explorer_header__options_item
							}
							id={user._id}
							key={user._id}>
							{user.login}
						</div>
					)
				})}
			</div>

			<div className={cl.list}>

				<div className={cl.header}>
					<span className={cl.icon}> </span>
					<span className={cl.filename}>filename</span>
					<span className={cl.date}>date</span>
					<span className={cl.size}>size</span>
				</div>

				{currentPath &&														//вверх
					<div className={cl.file}>
						<span className={cl.icon}>
							keyboard_return
						</span>
						<span className={cl.filename} onClick={() => setCurrentPath('')}    > ...
						</span>
					</div>
				}

				{(dataStatus === 'rejected') &&
					<span>'Не удалось загрузить список файлов'	</span>}

				{(dataStatus === 'loading') && <Loader />}

				{(dataStatus === 'succeeded') &&					//список файлов/папок
					(<div className={cl.body}>


						{
							folders ? folders.map(file => {
								return (
									<MyFile

										{...file}
										key={file.name}
										id={file.name}
										setPlay={play}
										setCurrentPath={setCurrentPath} />
								)
							}) : false
						}

						{
							files?.map(file => {
								return (
									<MyFile
										{...file}
										key={file.name}
										setPlay={play}
										setCurrentPath={setCurrentPath} />
								)
							})
						}


					</div>)
				}
			</div>

			{nowPlaying &&                              //аудио плеер
				<div className="player"> {nowPlaying}
					<audio
						ref={player}
						src={audioSrc} controls autoPlay preload="true" />
				</div>
			}
		</div>
	)
}
export default FileExplorer;

/* 	const foldersComponents = folders.map(file => {
		return (
			<MyFile
				{...file}
				key={file.name}
				id={file.name}
				setPlay={play}
				setCurrentPath={setCurrentPath} />
		)
	});

	const filesComponents = files.map(file => {
		return (
			<MyFile
				{...file}
				key={file.name}
				setPlay={play}
				setCurrentPath={setCurrentPath} />
		)
	}); */