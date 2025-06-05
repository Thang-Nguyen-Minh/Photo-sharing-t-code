import React, {useEffect,useState} from "react";
import {Card, CardContent, ListItem, Typography,Button} from "@mui/material";
import "./styles.css";
import {useParams,Link} from "react-router-dom";
import models from "../../modelData/models";

function UserPhotos () {
    const {userId} = useParams();
    const photos = models.photoOfUserModel(userId);
    return (
        <div>
            {photos.map(photo => {
                return (
                    <Card>
                        <img src={`/images/${photo.file_name}`} alt={photo.file_name} />
                        <Typography>{photo.date_time}</Typography>
                        {photo.comments && photo.comments.map(comment => (
                            <div>
                                <Link to={`/users/${comment.user._id}`}>
                                    {comment.user.first_name} {comment.user.last_name}
                                </Link>
                                <p>{comment.date_time}</p>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </Card>
                )
            })}
        </div>
    );
}

export default UserPhotos;
