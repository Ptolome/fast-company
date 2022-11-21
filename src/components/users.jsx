import React, { useState } from "react";
import api from "../api"
import "bootstrap/dist/css/bootstrap.css"
import SearchStatus from "./searchStatus";
import User from "./user";

const Users=() => {
    // console.log(api.users.fetchAll())
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
      
      setUsers(prevState=>prevState.filter(users =>users._id !==userId ))

    };
    
    return users.length !==0? (
     <> 
     {SearchStatus(users.length)}
      
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Избранное</th>
      </tr>
    </thead>
    
    <tbody>
    {users.map((user) =>(
     <User key={users._id}
      {...user}
      onDelete={handleDelete}/>        
           
       ))}
      
      
    </tbody>
  </table>

  </>
  ): 
  <>
  <h1><span
  className="badge bg-danger">Никто сегодня не тусанет с тобой!</span></h1>
  </>
}

export default Users;