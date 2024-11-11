import React , {useState}from "react";
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import {authActions} from "../../store/auth";
import { useSelector,useDispatch } from "react-redux";

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  const [Data, setData] = useState({ username: "", password: "" });
  
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
    if (Data.username === ""  || Data.password === "") {
      alert("All fields  are required!");
    } else {
      const response = await axios.post(
        "http://localhost:1000/api/v1/log-in",
        Data
      );
      setData({username: "", password: ""})
      localStorage.setItem("id",response.data.Id);
      localStorage.setItem("token",response.data.token);
      dispatch(authActions.login());
      history("/")


      
    }
    } catch (error) {
      alert(error.response?.data?.message ||"an error occured");
      
    }
  };

  return (
    <div className="flex items-center justify-center h-[98vh]">
      <div className=" w-2/6 rounded text-center bg-gray-800 p-4">
        <div className="text-xl">Login</div>
        <input
          type="username"
          name="username"
          onChange={change}
          value={Data.username}
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="password"
          name="password"
          onChange={change}
          value={Data.password}
          required
          placeholder="Enter your Password"
          className="bg-gray-700 px-3 py-2 my-3  w-full rounded"
        />
        <div className="w-full flex items-center justify-between">
          <button className="bg-blue-400 py-2 px-3 text-xl  text-black font-semifold rounded  " onClick={submit}>
            Login
          </button>
          <Link to="/signup"  className="text-gray-400">Not having an account? Sign up!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
