import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constans";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^.{4,}$/;
const initialForm = {
    email: "docente@desafiolatam.com",
    password: "123456",
    role: "Select a role",
    lenguage: "Select a lenguage",
};

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(initialForm);

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleForm = (event) => {
        event.preventDefault();

        if (
            !user.email.trim() ||
            !user.password.trim() ||
            user.role === "Select a role" ||
            user.lenguage === "Select a lenguage"
        ) {
            return window.alert("All field are required.");
        } else if (!emailRegex.test(user.email)) {
            return window.alert("Email format is not correct!");
        } else if (!passwordRegex.test(user.password)) {
            return window.alert("Password must have at least 4 characters!");
        }

        axios
            .post(ENDPOINT.users, user)
            .then(() => {
                window.alert("User registered successfully 😀.");
                navigate("/login");
            })
            .catch(({ response: { data } }) => {
                console.error(data);
                window.alert(`${data.message} 🙁.`);
            });
    };

    useEffect(() => {
        if (window.sessionStorage.getItem("token")) {
            navigate("/profile");
        }
    }, []);

    return (
        <form
            onSubmit={handleForm}
            className="col-10 col-sm-6 col-md-3 m-auto mt-5">
            <h1>Register a new user</h1>
            <hr />
            <div className="form-group mt-1 ">
                <label>Email address</label>
                <input
                    value={user.email}
                    onChange={handleUser}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="form-group mt-1 ">
                <label>Password</label>
                <input
                    value={user.password}
                    onChange={handleUser}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                />
            </div>
            <div className="form-group mt-1 ">
                <label>Role</label>
                <select
                    defaultValue={user.role}
                    onChange={handleUser}
                    name="role"
                    className="form-select">
                    <option disabled>Select a role</option>
                    <option value="Full Stack Developer">
                        Full Stack Developer
                    </option>
                    <option value="Frontend Developer">
                        Frontend Developer
                    </option>
                    <option value="Backend Developer">Backend Developer</option>
                </select>
            </div>
            <div className="form-group mt-1">
                <label>Lenguage</label>
                <select
                    defaultValue={user.lenguage}
                    onChange={handleUser}
                    name="lenguage"
                    className="form-select">
                    <option disabled>Select a lenguage</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Ruby">Ruby</option>
                </select>
            </div>
            <button type="submit" className="btn btn-light mt-3">
                Register
            </button>
        </form>
    );
};

export default Register;
