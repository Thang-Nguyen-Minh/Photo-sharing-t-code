import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import AddCommentBox from "./addComment";
import DeletePhoto from "./deletePhoto";
import { useContext } from "react";
import { UserContext } from "../Context/UseContext";
import EditPhoto from "./editPhoto";

function UserPhotos() {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();
    //Dùng useContext để lấy ra user
    const { user} = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                navigate("/"); // ⛔ Chưa đăng nhập thì điều hướng về login
                return;
            }
            try {
                const res = await axios.get(`https://8zns8f-8080.csb.app/photo/photosOfUser/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhotos(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [photos,userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    return (
        <div>
            {photos.map((photo) => (
                <Card key={photo._id} style={{ marginBottom: 20, padding: 10 }}>
                    <img
                        //src là đúng luôn cả localhost của backend thì nó mới nhận ảnh
                        src={`https://8zns8f-8080.csb.app/images/${photo.file_name}`}
                        alt={photo.file_name}
                        style={{ maxWidth: "100%", height: "450px" }}
                    />
                    <CardContent>
                    <Typography>Date: {formatDate(photo.date_time)}</Typography>

                    <Typography variant="h6">Comments: <AddCommentBox photoId={photo._id} /></Typography>
                    {photo.comments && photo.comments.map((comment) => (
                        <div key={comment._id}>
                            <Typography variant="body2">
                                {formatDate(comment.date_time)}
                            </Typography>
                            <Typography variant="body1">
                                <Link to={`/users/${comment.user._id}`}>
                                    {`${comment.user.first_name} ${comment.user.last_name}`}
                                </Link>
                                : {comment.comment}
                            </Typography>
                        </div>
                    ))}

                    {user && (
                        <>
                        <DeletePhoto
                            //Truyền 3 tham số vào đúng trong delete photo
                            //Xóa dùng filter giữ lại tất cả các ảnh có id khác id đã xóa
                            //VD : setPhotos(1,2,3) => setPhotos(1,3)
                            photo={photo}
                            currentUserId={user._id}
                            onDelete={(id) => setPhotos(prev => prev.filter(photo => photo._id !== id))}
                        />
                        <Button
                            variant="outlined"
                            color="info"
                            sx={{ marginTop: 1, marginLeft: 1 }}
                            onClick={() => navigate(`/edit/${photo._id}`)}
                        >
                            Edit Photo
                        </Button>
                        </>
                    )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default UserPhotos;
