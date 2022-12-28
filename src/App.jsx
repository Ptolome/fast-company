import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";
import { Route } from "react-router-dom";
import UserCard from "./components/userCard";

function App() {
    return <div>
        <NavBar/>;
        <Route path="/" exact component = {Main}/>
        <Route path="/login" component = {Login}/>
        <Route path="/users/:userCard" render={(props) => (<UserCard {...props}/>)}/>
        <Route path="/users" exact component = {Users}/>
    </div>;
}

export default App;
