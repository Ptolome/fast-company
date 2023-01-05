import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/layouts/users";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <div>
            <NavBar/>;
            <Switch>
                <Route path = "/users/:userId?" component = {Users} />
                <Route path = "/login" component = {Login}/>
                <Route path= "/" exact component = {Main}/>
            </Switch>
        </div>
    );
}

export default App;
