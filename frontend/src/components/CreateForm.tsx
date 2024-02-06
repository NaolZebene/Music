import React, {useState, ChangeEvent, FormEvent} from 'react'
import {useAppDispatch} from "../store/store"
import {addMusicRequest} from "../store/musicSlice"
import "../style/createStyle.css"

interface FormData{
    title:string,
    artist: string,
    album:string,
    genre:string
}

const CreateForm = (props:any)=> {
const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    title:"",
    artist: "", 
    album:"", 
    genre:""
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    setFormData((p)=>({
        ...p,
        [name]:value
    }))
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formData);
    dispatch(addMusicRequest(formData));
    props.close();
  }
  return (
    <div>
        <div className='headline'>
            <h5>Add New Music</h5>
        </div>
        <form className='create-form' onSubmit={handleSubmit}>
            <div className='form-input'>
                <label>Title</label>
                <div>
                    <input className='input-control' type='text' value={formData.title} name="title" onChange={handleChange} />
                </div>
            </div>

            <div className='form-input'>
                <label>Artist</label>
                <div>
                    <input className='input-control' type='text' value={formData.artist} name="artist" onChange={handleChange} />
                </div>
            </div>

            <div className='form-input'>
                <label>Album</label>
                <div>
                    <input className='input-control' type='text' value={formData.album} name="album" onChange={handleChange} />
                </div>
            </div>

            <div className='form-input'>
                <label>Genre</label>
                <div>
                    <input className='input-control' type='text' value={formData.genre} name="genre" onChange={handleChange} />
                </div>
            </div>


            <div className="all-buttons">
            <div>
              <button type='submit' className="create">Create</button>
            </div>
            <div>
              <button onClick={props.close} type='button' className="cancel">Cancel</button>
            </div>
          </div>
        </form>

    </div>
  )
}

export default CreateForm