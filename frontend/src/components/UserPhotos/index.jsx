import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import AddCommentBox from "./addComment";

function UserPhotos() {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                navigate("/"); // ⛔ Chưa đăng nhập thì điều hướng về login
                return;
            }
            try {
                const res = await axios.get(`http://localhost:8080/photo/photosOfUser/${userId}`, {
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
    }, [photos,userId]); // ✅ tránh fetch lại vô hạn

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
                        src={`http://localhost:8080/images/${photo.file_name}`}
                        alt={photo.file_name}
                        style={{ maxWidth: "100%", height: "auto" }}
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
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default UserPhotos;
