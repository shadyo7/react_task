import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const EditTodo = () => {
     
     const { id } = useParams();
     const [newday, setnewday] = useState('');
     const [newwork, setnewwork] = useState('');
     const [todo, setTodo] = useState([]);

  useEffect(() => {
    loadUsers(id);
  }, []);

  // const onSubmit = async e => {
  //   e.preventDefault();
  //   await axios.put(`http://localhost:3001/update${id}`, todo);
  //   history.push("/");
  // };
  // console.log('edit page id',id)
  const onSubmit = async e => {
    axios.put("http://localhost:3001/update", { day:newday, work:newwork,id:id}).then(
      (response) => {

        setTodo(
          todo.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  day: val.newday,
                  work: val.newwork,
                
                }
              : val;
          })
        );
      }
    );
  };



  // const loadUsers =  (async () => {
  //   const result = await axios(
  //     'http://localhost:3001/todoslist/edit:id',
  //   );
 
  //   setTodo(result.data);
  //   console.log('result',result);
  // });
  const loadUsers = (async () => {
    const result = await axios(`http://localhost:3001/edit/${id}`);
       
      //  console.log('resultmmmm',result.data);
       setTodo(result.data);
      
  });

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Todo</h2>
        <form>
          <div className="form-group">
          {todo.map((val,index) => (
            <div>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder={val.day}
                onChange={(e)=> setnewday(e.target.value)}
              />
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder={val.work}
                onChange={(e)=> setnewwork(e.target.value)}
              />
            </div>
               ))}
          </div>
          <Link
                    className="btn btn-warning btn-block"
                    to={`/`}
                    onClick={onSubmit}
                  >
                    Update Todo
                  </Link>
 
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
