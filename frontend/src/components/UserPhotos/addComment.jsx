import { Box, IconButton, TextField } from "@mui/material"
import { useState } from "react";
import { Send } from "@mui/icons-material";
import axios from "axios";
function AddCommentBox(props) {
    const [comment, setComment] = useState("");

    const handleClick = async (event) => {
        event.preventDefault();
        if (comment) {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.post(
                    `https://8zns8f-8080.csb.app/photo/commentsOfPhoto/${props.photoId}`,
                    { comment: comment },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true
                    }
                );
                setComment("");
                console.log("✅ Comment posted:", res.data);
            } catch (error) {
                console.error("❌ Comment error:", error.response?.data || error.message);
            }
        }
    };


    const handleChange = (event) => {
        setComment(event.target.value);
    }

    return (
        <Box>
            <TextField value={comment} onChange={handleChange} />
            <IconButton onClick={handleClick}><Send /></IconButton>
        </Box>

    );
}
export default AddCommentBox;