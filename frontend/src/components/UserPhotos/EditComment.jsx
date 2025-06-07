import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

function EditComment({ comment, photoId, userId, onUpdate }) {
    const [editText, setEditText] = useState(comment.comment);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.put(
                `http://localhost:8080/photo/commentsOfPhoto/${photoId}/${comment._id}`,
                { comment: editText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Updated!");
            setIsEditing(false);
            if (onUpdate) onUpdate(res.data.comment);
        } catch (err) {
            console.error("❌ Error updating comment:", err.response?.data || err.message);
        }
    };

    if (comment.user_id !== userId) return null;

    return (
        <div>
            {isEditing ? (
                <>
                    <TextField
                        size="small"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <Button onClick={handleUpdate} variant="outlined" sx={{ ml: 1 }}>
                        Save
                    </Button>
                </>
            ) : (
                <Button onClick={() => setIsEditing(true)} variant="outlined" size="small">
                    Edit
                </Button>
            )}
        </div>
    );
}

export default EditComment;
