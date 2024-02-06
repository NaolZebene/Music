import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {useAppDispatch, RootState} from "../store/store";
import { useSelector } from "react-redux";
import {updateMusicRequest} from "../store/musicSlice"

interface FormData {
  _id:string,
  title: string;
  artist: string;
  album: string;
  genre: string;
}

 const EditForm = (props:any) =>{

const dispatch = useAppDispatch();

  const musicData = useSelector((state : RootState)=>state.music);

  const [formData, setFormData] = useState<FormData>({
    _id:"",
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    const getMusicById = () => {
      let foundMusic = musicData.musicList.find((music:any) => music._id === props.id);
      if(!foundMusic){
        foundMusic ={
            _id:"",
            title: "",
            artist: "",
            album: "",
            genre: "",
          };
      }
      setFormData(foundMusic);
    };
    getMusicById();
  }, [props.id, musicData]);

 

 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateMusicRequest(formData));
    props.close();
    
  };
  return (
    <div>
      <div className="headline">
        <h5>Add New Music</h5>
      </div>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Title</label>
          <div>
            <input
              className="input-control"
              type="text"
              value={formData.title}
              name="title"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-input">
          <label>Artist</label>
          <div>
            <input
              className="input-control"
              type="text"
              value={formData.artist}
              name="artist"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-input">
          <label>Album</label>
          <div>
            <input
              className="input-control"
              type="text"
              value={formData.album}
              name="album"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-input">
          <label>Genre</label>
          <div>
            <input
              className="input-control"
              type="text"
              value={formData.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="all-buttons">
          <div>
            <button type="submit" className="create">
              Edit
            </button>
          </div>
          <div>
            <button onClick={props.close} type="button" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
