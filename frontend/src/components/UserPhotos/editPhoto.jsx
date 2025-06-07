import React,{useState,useContext} from "react"
import axios from "axios"
import {Button} from "@mui/material"
import {useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../Context/UseContext";

function EditPhoto() {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const {user} = useContext(UserContext);
    console.log(user._id)

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);

        try{
            const token = localStorage.getItem("accessToken");
            await axios.put(`http://localhost:8080/photos/edit/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            })
            alert("Photo edit successfully.")
            navigate(`/photos/${user._id}`,{replace:true});
        }
        catch(err){
            console.log("Edit error: ", err.response?.data || err.message);
        }
    }

    return(
        <form onSubmit={handleEdit}>
            <h3>Edit Photo</h3>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            <Button type="submit" variant="contained" color="warning">
                Edit Photo
            </Button>
        </form>
    )
}

export default EditPhoto;