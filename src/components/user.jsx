import React,{useState} from "react";
import Qualitie from "./qualitie"
import BookMark from "./bookmark";
import App from '../App'

const User = (props) =>{
    

    return(
      

    <tr key={props._id}>
        
        <td>{props.name}</td>
        <td>{props.qualities.map(item=>(
          <span className={Qualitie(item.color)}>{item.name}</span> 
          ))}</td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
        
        <td>
        <BookMark /></td>
        <button
          className="btn bg-danger badge"
          key={props._id}
          onClick={()=>props.onDelete(props._id)}
        //   onClick={() =>handleDelete(props._id)}
         >delete</button> 
         
      </tr>
    )
   
}
export default User;