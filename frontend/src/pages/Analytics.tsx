import React, {useState,useEffect} from 'react'
import "../style/analyticsStyle.css"
import {fetchDataRequest, fetchMusicRequest, fetchAllRequest} from "../store/musicSlice";
import {useAppDispatch, RootState} from "../store/store";
import { useSelector } from "react-redux";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import DenseTable from '../components/DenseTable';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function Analytics() {
  const dispatch = useAppDispatch();
  const musicData = useSelector((state : RootState)=>state.music)
  console.log(musicData);

  const [d, setd] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  useEffect(()=>{
    dispatch(fetchMusicRequest());
    dispatch(fetchDataRequest());
    dispatch(fetchAllRequest())
  }, [dispatch])

  useEffect(()=>{
    setd(musicData.recentData)
  },[musicData]);




  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','aug'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [{
      label: 'Number of songs by Month',
      barPercentage: 0.5,
      barThickness: 10,
      maxBarThickness: 12,
      minBarLength: 2,
      data: musicData.recentData,
      backgroundColor: [
        'rgb(153, 102, 255)'
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    }]
  });


  
  return (
    <div className='analytics'>
      <div className='chart'>
        <Bar className='bar' data={data} />
      </div>

      <div className='card-container'>
    <div className='card'>
        <span><h1>Albums</h1></span>
        <div className='content'>
          <p>Total: </p>
          <p>{musicData.generalInfo.album || "Loading"}</p>
        </div>
        
        
      </div>
      
      
      <div className='card'>
        <span><h1>Artists</h1></span>
        <div className='content'>
          <p>Total: </p>
          <p>{Object.keys(musicData.generalInfo).length > 0 ? musicData.generalInfo.artist : "Loading"}</p>
        </div>
        
        
      </div>

      <div className='card'>
        <span><h1>Songs</h1></span>
        <div className='content'>
          <p>Total: </p>
          <p>{musicData.musicList.length|| "Loading"}</p>
        </div>
        
        
      </div>

      <div className='card'>
        <span><h1>Genres</h1></span>
        <div className='content'>
          <p>Total: </p>
          <p>{musicData.generalInfo['genre'] || "Loading"}</p>
        </div>
      </div>  
    </div>

      {/* <div className='table'>
        <DenseTable/>
      </div> */}
      <div>

      </div>
    </div>
  );
  
}

export default Analytics