import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [todolist, settodolist] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =  (async () => {
    const result = await axios( 'http://localhost:3001/todoslist');
 
    settodolist(result.data);
    
  });

  const deletetodo = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      settodolist(
        todolist.filter((val) => {
          return val.id != id;
        })
      );
    });
  };




  return (
    <div className="container">
      <div className="py-4">
        <h1>daily Work To Do</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
            <th scope="col">#</th>
              <th scope="col">Day</th>
              <th scope="col">work</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todolist.map((val,index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{val.day}</td>
                <td>{val.work}</td>
                <td>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/Todo/edit/${val.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deletetodo(val.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
