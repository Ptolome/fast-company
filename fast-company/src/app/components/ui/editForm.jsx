import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { Link, useHistory } from "react-router-dom";

const EditForm = ({ match, location }) => {
    const history = useHistory();
    const userId = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const [data, setData] = useState({
        name: "1",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    // console.log(user);
    // // const { _id, ...z } = { user: user };
    // console.log(user[name]);

    // console.log(_id);
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const [defaultQualities, setDefaultqualities] = useState([]);
    useEffect(() => {
        const user1 = { ...user };
        const defaultQualitiesList = user1.qualities?.map((item) => ({
            value: item._id,
            label: item.name,
            color: item.color
        }));

        const userEdit = {
            name: user1.name,
            email: user1.email,
            profession: user1.profession,
            sex: user1.sex,
            qualities: defaultQualitiesList
        };
        console.log("user1", user1);
        setDefaultqualities(defaultQualitiesList);
        setData(userEdit);
    }, [user]);

    console.log("user", user);
    console.log(data);
    const [qualities, setQualities] = useState();
    const [professions, setProfession] = useState([]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    // const handleSave = ()
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,

            [target.name]: target.value
        }));
    };
    const hadleBack = () => {
        history.push(`/users/${userId}`);
    };
    const handleSubmit = () => {
        const dataUp = data.qualities?.map((item) => ({
            _id: item.value,
            name: item.label,
            color: item.color
        }));
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });

        data.profession = getProfessionById(profession);
        data.qualities = dataUp;
        console.log(data);
        api.users.update(userId, data);
    };

    return (
        qualities && (
            <>
                <div className="container mt-5 position-relative">
                    <button
                        onClick={hadleBack}
                        className="position-absolute top-10 start-10 btn btn-primary btn-sm"
                    >
                        назад
                    </button>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                />

                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professions}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <Link to={`/users/${userId}`}>
                                    <button
                                        className="btn btn-primary w-100 mx-auto"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Изменить
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

// EditForm.propTypes = {
//     match: PropTypes.string,
//     Location: PropTypes.string
// };
export default EditForm;
