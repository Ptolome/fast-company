import React, { useState } from "react";
import api from "../api"
import "bootstrap/dist/css/bootstrap.css"

const Users=() => {
    // console.log(api.users.fetchAll())
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
      
      setUsers(prevState=>prevState.filter(users =>users._id !==userId ))

    };
    const getBageClasses = (color) =>{
      let classes = 'badge m-2 '
      classes+= 'bg-'+ color
      return classes
    }
    
    
    const renderPharse = (number) => {
      let text =  number>=4 || number===1 ? 
        (' человек тусанет с тобой сегодня'):(' человекa тусанут с тобой сегодня')
      
           
    
      return (
        <h1><span
        className="badge bg-primary">
          {number}
          {text} 
            
        </span></h1>
      )


    }
    

    return users.length !==0? (
     <> 
     {renderPharse(users.length)}
      
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
      </tr>
    </thead>
    
    <tbody>
    {users.map(user =>(<tr key={user._id}>
        
          <td>{user.name}</td>
          <td>{user.qualities.map(item=>(
            <span className={getBageClasses(item.color)}>{item.name}</span> 
            ))}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}/5</td>
           <button
            className="btn bg-danger badge"
            key={user._id}
            onClick={() =>handleDelete(user._id)}
           >delete</button> 
        </tr>
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