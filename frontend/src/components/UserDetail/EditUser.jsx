import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Context/UseContext";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditUserInfo() {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        location: user.location || "",
        description: user.description || "",
        occupation: user.occupation || ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.put(`https://8zns8f-8080.csb.app/user/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("User info updated");

            setUser(res.data); // ✅ cập nhật lại context
            navigate(`/users/${user._id}`);
        } catch (err) {
            console.log("Update failed:", err.response?.data || err.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
            <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} />
            <TextField label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">Save</Button>
        </Box>
    );
}

export default EditUserInfo;
