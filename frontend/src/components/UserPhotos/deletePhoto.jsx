import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function DeletePhoto({photo,currentUserId,onDelete}) {
    //const navigate = useNavigate();
    //Viết hàm handleDelete
    const handleDelete = async () => {
        //Hiện thông báo của window, không hiện return luôn
        if (!window.confirm("Are you sure you want to delete this photo?")) return;
        //Viết axios như bthg
        try{
            const token = localStorage.getItem("accessToken");
            //Xóa đường dẫn photo khi đã đăng nhập
            await axios.delete(`http://localhost:8080/photo/${photo._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            //Hiện thông báo xóa thành công
            alert("Successfully deleted photo");
            //Truyền onDelete vào photo._id
            if (onDelete) onDelete(photo._id);
            //Có thể chuyển về trang user hoặc không tùy
            //navigate(`/users/${currentUserId}`);
        }
        catch (error) {
            console.log("Delete Failed", error.response?.data || error.message);
        }
    }

    //Chỉ render nếu đúng chủ sở hữu vl chỗ quan trong nhất đéo code
    if (photo.user_id!==currentUserId) return null;
    return(
        <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            sx={{marginTop: 1}}
        >
        DELETE PHOTO
        </Button>
    )
}

export default DeletePhoto;