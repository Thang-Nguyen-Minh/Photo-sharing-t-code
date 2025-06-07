import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function DeleteComment(props) {
    const {photo,comment,userId,onDelete} = props;
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        console.log("✅ Passed confirm"); // Log 1
        try{
            const token = localStorage.getItem("accessToken");
            const res = await axios.delete(`http://localhost:8080/photo/commentsOfPhoto/${photo._id}/${comment._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("✅ API responded:", res.data); // Log 3
            alert("Successfully deleted!");
            if (onDelete) onDelete(comment._id);
        }
        catch(err){
            console.log("❌ Error in delete request:", err.response?.data || err.message);
        }
    }
    if (comment.user_id!==userId) return null;
    return(
        <Button
            onClick={handleDelete}
            color="error"
            variant="outlined"
            sx={{marginTop : 1}}
        >DELETE COMMENT</Button>
    )
}

export default DeleteComment;