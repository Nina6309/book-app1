import React ,{useState,useEffect} from 'react';
import Card from '../Home/Card';
import { IoAddCircleOutline } from "react-icons/io5";
import InputData from '../Home/InputData';
import axios from "axios";





function Alltask() {
  const [InputDiv,setInputDiv]=useState("hidden");
const [Data,setData]=useState();
const [UpdatedData,setUpdatedData]=useState({id:'',title :'',desc :''})
const configHeaders ={
  id:localStorage.getItem("id"),authorization: `Bearer ${localStorage.getItem("token")}`

} 

const fetch = async () => {
  try {
    const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", {
      headers:configHeaders , 
    }
    
  );
  setData(response.data.data);
} catch (error) {
  console.error("Error fetching tasks:", error);
}

};
useEffect(() => {
  

  fetch()
},[]);
  

  return (
    <>
    <div>
        <div className='flex w-full items-end justify-end px-4 pb-0'>
            <button onClick={()=>setInputDiv("fixed")} >
        <IoAddCircleOutline className="text-3xl text-gray-400 hover:text-gray-100 transition-all duration-300 " />

            </button>
        </div>
    {Data &&  (<Card home ={"true"} setInputDiv={setInputDiv} data={Data.tasks} fetch={fetch} setUpdatedData={setUpdatedData}/>)}
    </div>
    <div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} fetch={fetch} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData}/>
    </div>
    
    
    </>
  )
}

export default Alltask
