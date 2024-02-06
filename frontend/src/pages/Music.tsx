import React, { useState, useEffect } from "react";
import "../style/musicStyle.css";
import { FaPlus } from "react-icons/fa";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CreateForm from "../components/CreateForm";
import {useAppDispatch, RootState} from "../store/store";
import { useSelector } from "react-redux";

import {deleteMusicRequest, fetchMusicRequest, fetchDataRequest} from "../store/musicSlice";
import EditForm from "../components/EditForm";
// import {useAppDispatch} from "../store/store"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface MusicItem {
  _id:string,
  title: string;
  artist: string;
  album: string;
  genre: string;
}

function Music() {
  const dispatch = useAppDispatch()
  const musicData = useSelector((state : RootState)=>state.music);
  const [id, setid] = useState("");

  useEffect(()=>{
    dispatch(fetchMusicRequest());
    dispatch(fetchDataRequest());
  }, [dispatch])
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalType, setModalType] = useState(1);



  // console.log(musicData, "music data");
  const modalOpenCreate = ()=>{
    setModalType(1);
    handleOpen();
  }

  const modalOpenEdit = (id:string)=>{
    setModalType(0);
    setid(id);
    handleOpen();
  }

  const deleteMusic = (id:string)=>{
    console.log(id);
    dispatch(deleteMusicRequest(id));
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalType == 1 ? <CreateForm close={handleClose}/>: <EditForm close={handleClose} id={id} />}
        </Box>
      </Modal>
      <div className="navigation">
        <div className="music-list">
          <p>Music List</p>
        </div>
        <div className="nav-icon" onClick={()=>modalOpenCreate()}>
          <FaPlus />
        </div>
      </div>
      <div className="card-container">
        {musicData.musicList?.map((music:MusicItem) => {
          return(
            <div className="card">
          <span>
            <h1>{music.title}</h1>
          </span>
          <div className="content">
            <p>Artist: </p>
            <p>{music.artist}</p>
          </div>
          <div className="content">
            <p>Album: </p>
            <p>Anti</p>
          </div>
          <div className="content">
            <p>Genere: </p>
            <p>{music.genre}</p>
          </div>
          <div className="buttons">
            <div>
              <button onClick={()=>modalOpenEdit(music._id)} className="edit">Edit</button>
            </div>
            <div>
              <button onClick={()=>{deleteMusic(music._id)}} className="delete">Delete</button>
            </div>
          </div>
        </div>
          )
        })}
      </div>
    </div>
  );
}

export default Music;
