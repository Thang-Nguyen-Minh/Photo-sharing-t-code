import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/admin/login", form);
            localStorage.setItem("accessToken", res.data.token);
            setUser(res.data.user);
            navigate(`/users/${res.data.user._id}`);
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <input
                name="username"
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
            /><br />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            /><br />
            <button type="submit">Login</button>
            <p style={{ color: "red" }}>{error}</p>
        </form>
    );
}
