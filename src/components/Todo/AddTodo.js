import React, { useState } from "react";
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";

const AddTodo = () => {
    const [day, setday] = useState('');
    const [work, setwork] = useState('');


  const todos = async e => {
    e.preventDefault();
    fetch('http://localhost:3001/todos',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            day,
            work,
        })
    }).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            alert('Saved');
        } else {
            alert('Issues saving');
        }
    });
}  

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Todo Task</h2>
        <form >
             <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Current Day"
              onChange={(e)=> setday(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter To do Work"
              onChange={(e)=> setwork(e.target.value)}
            />
          </div>
          <Link
            className="btn btn-primary btn-block"
            onClick={todos}
            to={`/`}
            >
            Add Todo</Link>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
