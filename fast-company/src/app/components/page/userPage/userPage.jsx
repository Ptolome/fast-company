import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory, Link } from "react-router-dom";
import { passedTime } from "../../../utils/passedTime";
import SelectField from "../../common/form/selectField";
import TextFieldArea from "../../common/form/textFieldArea";

const UserPage = ({ userId }) => {
    const [data, setData] = useState({
        name: "",
        comment: ""
    });
    const history = useHistory();
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
    const [comments, setComments] = useState("");

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => setComments(comment));
        api.users.fetchAll().then((users) => {
            const userList = Object.keys(users).map((userItem) => ({
                label: users[userItem].name,
                value: users[userItem]._id
            }));
            setAllUsers(userList);
        });
    }, []);
    const handlePublish = () => {
        const newData = {
            pageId: userId,
            userId: data.name,
            content: data.comment
        };
        api.comments.add(newData);
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => setComments(comment));
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,

            [target.name]: target.value
        }));
        console.log("data", data);
    };
    const handleClick = () => {
        history.push("/users");
    };
    const handleDelete = (idForDel) => {
        api.comments.remove(idForDel);
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => setComments(comment));
    };
    console.log(allUsers);
    comments ? console.log(comments) : console.log("loading comments");
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <Link to={`/users/${userId}/edit`}>
                                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                        <i className="bi bi-gear">+</i>
                                    </button>
                                </Link>

                                <div className="d-flex flex-column align-items-center text-center position-relative">
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="165"
                                        height="165"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="bi bi-caret-down-fill text-primary"
                                                role="button"
                                            ></i>
                                            <i
                                                className="bi bi-caret-up text-secondary"
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    <Qualities qualities={user.qualities} />
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">
                                    {user.completedMeetings}
                                </h1>
                            </div>
                        </div>

                        <h2>Rate: {user.rate}</h2>
                        <button onClick={handleClick}> Все Пользователи</button>
                        <Link to={`/users/${userId}/edit`}>
                            <button> Изменить</button>
                        </Link>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-2">
                            {" "}
                            <div className="card-body ">
                                <h2>New coments</h2>
                                <hr />
                                {allUsers && (
                                    <>
                                        <SelectField
                                            label="Выберите пользователя"
                                            defaultOption="Choose..."
                                            options={allUsers}
                                            name="name"
                                            onChange={handleChange}
                                            value={data.name}
                                        />
                                        <TextFieldArea
                                            label="Comments"
                                            type="textarea"
                                            name="comment"
                                            value={data.comment}
                                            onChange={handleChange}
                                            row={3}
                                            // error={errors.password}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePublish}
                                        >
                                            Опубликовать
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body ">
                                <h2>Comments</h2>
                                <hr />
                                {comments.map((comment) => {
                                    return (
                                        <div
                                            key={comment._id}
                                            className="bg-light card-body  mb-3"
                                        >
                                            <div className="row">
                                                <div className="col">
                                                    <div className="d-flex flex-start ">
                                                        <img
                                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                                Math.random() +
                                                                1
                                                            )
                                                                .toString(36)
                                                                .substring(
                                                                    7
                                                                )}.svg`}
                                                            className="rounded-circle shadow-1-strong me-3"
                                                            alt="avatar"
                                                            width="65"
                                                            height="65"
                                                        />
                                                        <div className="flex-grow-1 flex-shrink-1">
                                                            <div className="mb-4">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <p className="mb-1 ">
                                                                        {
                                                                            JSON.parse(
                                                                                localStorage.getItem(
                                                                                    "users"
                                                                                )
                                                                            ).find(
                                                                                (
                                                                                    item
                                                                                ) => {
                                                                                    return (
                                                                                        item._id ===
                                                                                        comment.userId
                                                                                    );
                                                                                }
                                                                            )
                                                                                .name
                                                                        }
                                                                        <span className="small">
                                                                            {passedTime(
                                                                                comment.created_at
                                                                            )}
                                                                        </span>
                                                                    </p>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                comment._id
                                                                            )
                                                                        }
                                                                        className="btn btn-sm text-primary d-flex align-items-center"
                                                                    >
                                                                        <i className="bi bi-x-lg">
                                                                            x
                                                                        </i>
                                                                    </button>
                                                                </div>
                                                                <p className="small mb-0">
                                                                    {
                                                                        comment.content
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
