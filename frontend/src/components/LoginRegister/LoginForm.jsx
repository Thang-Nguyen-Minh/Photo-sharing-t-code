import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UseContext";

export default function LoginForm() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); // ✅ dùng context thay vì props

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset lỗi trước khi gửi
        try {
            const res = await axios.post("http://localhost:8080/admin/login", form);
            localStorage.setItem("accessToken", res.data.token);    // ✅ lưu token
            setUser(res.data.user);                                 // ✅ set user vào context
            navigate(`/users/${res.data.user._id}`);                // ✅ chuyển route
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
            /><br />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            /><br />
            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
