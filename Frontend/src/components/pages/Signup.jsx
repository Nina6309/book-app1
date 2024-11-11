import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector} from "react-redux";

function Signup() {
  
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
    if (Data.username === "" || Data.email === "" || Data.password === "") {
      alert("All fields  are required!");
    } else {
     
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Data
        );
        setData({username: "", email: "", password: ""})
        alert(response.data.message);

        history("/login");

      
      }
      } catch (error) {
        alert(error.response?.data?.message ||"an error occured");
      
        
      }
    
  };
  return (
    <>
      <div className="flex items-center justify-center h-[98vh]">
        <div className=" w-2/6 rounded text-center bg-gray-800 p-4">
          <div className="text-xl">SignUp</div>
          <input
            type="text"
            name="username"
            value={Data.username}
            onChange={change}
            placeholder="Username"
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <input
            type="email"
            name="email"
            value={Data.email}
            onChange={change}
            placeholder="Enter your Email.."
            required
            className="bg-gray-700 px-3 py-2 my-3  w-full rounded"
          />
          <input
            type="Password"
            name="password"
            value={Data.password}
            onChange={change}
            required
            placeholder="Enter your Password"
            className="bg-gray-700 px-3 py-2 my-3  w-full rounded"
          />
          <div className=" w-full flex items-center justify-between">
            <button
              className="bg-blue-400 py-2 px-3  text-xl text-black font-semifold rounded  "
              onClick={submit}
            >
              SignUp
            </button>
            <Link to="/login" className="text-gray-400">Already you have an account just Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
