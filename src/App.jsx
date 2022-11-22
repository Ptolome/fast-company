import React, {useState} from "react";
import Users from "./components/users"

import API from "./api";


 function App() {
    
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {setUsers(prevState=>prevState.filter(users =>users._id !==userId ))
      console.log('удаляем')
      console.log(users)
      console.log(userId)
      console.log('users._id',users._id)
    }
    
    return <Users users = {users} onDelete={handleDelete}/>;
 }

export default App;
