import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DeletePhoto({ photo, currentUserId, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this photo?")) return;

        try {
            await axios.delete(`http://localhost:8080/photo/${photo._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            alert("Photo deleted");
            if (onDelete) onDelete(photo._id);
            //navigate(`/users/${currentUserId}`);
        } catch (err) {
            console.error("❌ Delete failed:", err.response?.data || err.message);
        }
    };

    // ✅ Chỉ render nút nếu đúng chủ sở hữu
    if (photo.user_id !== currentUserId) return null;

    return (
        <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            sx={{ marginTop: 1 }}
        >
            Delete Photo
        </Button>
    );
}

export default DeletePhoto;
