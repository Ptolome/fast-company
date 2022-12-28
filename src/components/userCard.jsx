import React, { useState, useEffect } from "react";
import api from "../api";

const UserCard = ({ ...item }) => {
    const postId = item.match.params.userCard;
    console.log(postId);
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(postId).then((data) => {
            setUser(data);
        });
        console.log(user);
    }, [user]);
    const handleSave = () => {
        item.history.push("/users");
    };
    return <>
        <h1>{ "user.name" }</h1>
        <h1>{`Профессия : ${"user.profession.name"}`}</h1>
        <h2>{`completedMeetings : ${"user.completedMeetings"}`}</h2>
        <button
            onClick={() => handleSave()}>
                Все пользователи
        </button>
    </>;
};

export default UserCard;
