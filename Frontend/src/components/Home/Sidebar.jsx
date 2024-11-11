import React ,{useState,useEffect} from 'react';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
function Sidebar() {
  const dispatch =useDispatch();
  const history =useNavigate();
  const location=useLocation()

  const data=[
    {title:"All tasks", icon: <CgNotes />,
      link: "/",
},
{
  title:"Completed tasks", icon: 
  <FaCheckDouble />,   link: "/completedtask",
},
{
  title:"Important tasks",
  icon: <MdLabelImportant />,  link: "/importanttask",
},


,{
  title:"Incompleted tasks",
  icon: <TbNotebookOff /> , link: "/incompletedtask"
}






];
const [Data,setData]=useState();
const logout=()=>{

  dispatch(authActions.logout());
  localStorage.clear("id");
  localStorage.clear("token");
  history("/signup");

}
const configHeaders ={
  Id:localStorage.getItem("id"),Authorization: `Bearer ${localStorage.getItem("token")}`

}
useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers : configHeaders ,}

      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  if ( localStorage.getItem("id") && localStorage.getItem("token")
    
  ){
    fetch();
  }
  
  // eslint-disable-next-line
},[]);

  return (
 <>
    {Data && (<div>

<h2 className='text-xl font-semibold'>{Data.username}</h2>
<h4 className='text-gray-400 mb-1'>{Data.email}</h4>
<hr />
</div> )}
      <div className='my-2'>
        {
          data.map((items,i)=>(
              <Link  to={items.link} key={i} className={`flex my-2 items-center hover:bg-gray-600 p-2 rounded transition-all duration-300 ${location?.pathname==items.link?'bg-gray-600':''}`}>
                {items.icon} &nbsp; {items.title}
              </Link>

          )
          )
        }
      </div>
      <div className='my-2 bg-gray-600 w-full p-2 rounded text-center'>
        <button onClick={logout}>Log out</button>
      </div>

      
      
      
    </>
  )
}

export default Sidebar;
