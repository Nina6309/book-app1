import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GiCrossedBones } from "react-icons/gi";
import {  toast } from "react-toastify";

function InputData({ InputDiv, setInputDiv, fetch, UpdatedData, setUpdatedData }) {
  const [state, setState] = useState({
    id: "",
    title: "",
    desc: "",
    date: ""
  });

  useEffect(() => {
    setState({
      title: UpdatedData.title,
      desc: UpdatedData.desc,
      date: UpdatedData.date || new Date().toLocaleDateString()
    });
  }, [UpdatedData]);

  const handleCreate = async () => {
    try {
      if (!state.title || !state.desc) {
        toast.error('Please enter title and description');
        return;
      }
      const configHeaders = {
        Id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      };
      const response = await axios.post(
        'http://localhost:1000/api/v2/create-task',
        state,
        { headers: configHeaders }
      );
      if (response?.data?.message) {
        fetch();
        setInputDiv('hidden');
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error('Failed to create the task');
      console.log(error, 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const UpdateTask = async () => {
    try {
      if (!state.title || !state.desc) {
        toast.error('Please enter title and description');
        return;
      }
      const configHeaders = {
        Id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      };
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-task/${UpdatedData.id}`,
        state,
        { headers: configHeaders }
      );
      if (response?.data?.message) {
        fetch();
        setUpdatedData({ id: "", title: "", desc: "" });
        setState({ title: "", desc: "" });
        setInputDiv('hidden');
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error('Failed to update the task');
      console.log(error, 'error');
    }
  };

  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-gray-900 opacity-50 h-screen w-full`}></div>
      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-3/6 bg-gray-800 p-4 rounded justify-end'>
          <div className='flex justify-end text-2xl'>
            <button onClick={() => {
              setInputDiv('hidden');
              setState({ title: "", desc: "" });
              setUpdatedData({ id: "", title: "", desc: "" });
            }}>
              <GiCrossedBones />
            </button>
          </div>
          <input
            type="text"
            placeholder='Title'
            name='title'
            value={state.title}
            onChange={handleChange}
            className='px-3 py-2 my-3 rounded w-full bg-slate-600'
          />
          <textarea
            name="desc"
            placeholder='Description'
            value={state.desc}
            onChange={handleChange}
            cols="30"
            rows="10"
            className='px-3 py-2 my-3 rounded w-full bg-slate-600'
            style={{ resize: 'none' }}
          ></textarea>

          {UpdatedData.id === "" ? (
            <button
              className='px-3 py-2 bg-blue-400 rounded text-2xl text-black font-semibold'
              onClick={handleCreate}
            >
              Submit
            </button>
          ) : (
            <button
              className='px-3 py-2 bg-blue-400 rounded text-2xl text-black font-semibold'
              onClick={UpdateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default InputData;
