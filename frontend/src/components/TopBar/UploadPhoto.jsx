import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UploadPhoto({ userId }) {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            await axios.post("https://8zns8f-8080.csb.app/photos/new", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            navigate(`/photos/${userId}`); // ✅ chuyển tới trang ảnh người dùng
        } catch (err) {
            console.error("❌ Upload failed:", err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Upload Photo
            </Button>
        </form>
    );
}

export default UploadPhoto;
