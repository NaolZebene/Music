import React, { useEffect , useState} from 'react'
import {useAppDispatch, RootState} from "../store/store";
import { useSelector } from "react-redux";
import {fetchMusicRequest} from "../store/musicSlice";
import axios from "axios"

function Artists() {

  const dispatch = useAppDispatch();
  const [data, setData] = useState<{ [key: string]: number }>({});;

  useEffect(()=>{
    dispatch(fetchMusicRequest());
  })

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get("http://localhost:5000/music/artistinfo");
      const jsonData = (response.data.payload);
      setData(jsonData);
    }
    fetchData();
  }, [])

  console.log("artist", data);

  const renderCard = ()=>{
    return Object.keys(data).map((key:string) => (
      <div className='card'>
        <span><h1>{key.charAt(0).toUpperCase() + key.slice(1)}</h1></span>
      
        <div className='content'>
          <p>Songs: </p>
          <p>{data[key]}</p>
        </div>
        
      </div>
    ))
  }
  
  return (
    <div>
    <div className='card-container'>
      {Object.keys(data).length && renderCard()}
    </div>
  </div>
  )
}

export default Artists