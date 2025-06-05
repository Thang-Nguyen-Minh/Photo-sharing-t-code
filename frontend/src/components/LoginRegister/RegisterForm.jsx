import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
    const [form, setForm] = useState({
        username: "", password: "", confirmPassword: "",
        first_name: "", last_name: "", location: "", description: "", occupation: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            await axios.post("http://localhost:8080/admin/signUp", form);
            setSuccess("Account created successfully!");
            setError("");
        } catch (err) {
            setSuccess("");
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h3>Register</h3>
            <input name="username" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} required /><br />
            <input name="password" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required /><br />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required /><br />
            <input name="first_name" placeholder="First Name" onChange={(e) => setForm({ ...form, first_name: e.target.value })} required /><br />
            <input name="last_name" placeholder="Last Name" onChange={(e) => setForm({ ...form, last_name: e.target.value })} required /><br />
            <input name="location" placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} /><br />
            <input name="occupation" placeholder="Occupation" onChange={(e) => setForm({ ...form, occupation: e.target.value })} /><br />
            <input name="description" placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} /><br />
            <button type="submit">Register Me</button>
            <p style={{ color: "green" }}>{success}</p>
            <p style={{ color: "red" }}>{error}</p>
        </form>
    );
}
