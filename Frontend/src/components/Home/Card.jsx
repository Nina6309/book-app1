import React, { useState } from "react";
import { IoCreateSharp } from "react-icons/io5";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ home, setInputDiv, data, fetch, setUpdatedData }) => {
  const configHeaders = {
    Id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
 const [importantTasks,setImportantTasks] =useState([]);
  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers: configHeaders }
      );

      if (response?.data?.message) {
        fetch();
        toast.success(response?.data?.message);  // Success notification
      }
    } catch (error) {
      toast.error("Failed to complete the task.");  // Error notification
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    
    
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,
        {},
        { headers: configHeaders }
      );
      if (response?.data?.message) {
        fetch();
        toast.success(response?.data?.message);  // Success notification
      }
    } catch (error) {
      toast.error("Failed to mark as important.");  // Error notification
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,
        { headers: configHeaders }
      );
      if (response?.data?.message) {
        fetch();
        toast.success(response?.data?.message);  // Success notification
      }
    } catch (error) {
      toast.error("Failed to delete the task.");  // Error notification
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data?.length > 0 &&
        data.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-800 rounded-sm p-4"
          >
            <div>
              <h3 className="text-xl font-semibold">{item?.title}</h3>
              <p className="text-gray-400">{item?.desc}</p>
              <p className="text-gray-500 text-sm">
                {moment(item?.createdAt).calendar()}
              </p>
            </div>

            <div className="mt-4 items-center w-full flex justify-around text-xl">
              <button
                className={`${
                  item?.complete ? "bg-red-600" : "bg-green-500"
                } rounded p-2 w-3/6`}
                onClick={() => {if(item?.complete)return toast.success("Task is already completed!"); handleCompleteTask(item?._id)}}
              >
                {item?.complete ? "Completed" : "Incomplete"}
              </button>
              <div className="p-2 text-white w-3/6 text-2xl flex justify-around font-semibold">
                <button onClick={() =>  handleImportant(item._id)}>
                  {item?.important ? (
                    <FaRegEdit className="text-pink-500" />
                  ) : (
                    <IoCreateSharp />
                  )}
                </button>

                {home !== "false" && (
                  <button onClick={() => handleUpdate(item?._id, item?.title, item?.desc)}>
                    <MdOutlineSystemUpdateAlt />
                  </button>
                )}
                <button onClick={() => deleteTask(item?._id)}>
                  <RiDeleteBinFill/>
                </button>
              </div>
            </div>
          </div>
        ))}

      {home === "true" && (
        <button
          className="bg-gray-800 rounded-sm p-4 flex flex-col justify-center items-center text-gray-300 hover:scale-105 hover:cursor-pointer"
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircleOutline className="text-6xl" />
          <h2 className="font-semibold text-2xl mt-4 justify-around">
            Add More Task
          </h2>
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Card;
