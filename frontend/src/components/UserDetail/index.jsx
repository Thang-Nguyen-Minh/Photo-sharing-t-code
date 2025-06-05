import React, {useEffect, useState} from "react";
import {Typography, Card, CardContent, Button} from "@mui/material";
import "./styles.css";
import {Link, useParams} from "react-router-dom";
import UserList from "../UserList";
import models from "../../modelData/models";

function UserDetail() {
    const {userId} = useParams();
    const users = models.userModel(userId);
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5">User Information</Typography>
                    <Typography variant="body1"><strong>Name : </strong>
                        {users.first_name} {users.last_name}
                    </Typography>
                    <Typography variant="body1"><strong>Location : </strong>
                        {users.location} 
                    </Typography>
                    <Typography variant="body1"><strong>Description : </strong>
                        {users.description} 
                    </Typography>
                    <Typography variant="body1"><strong>Occupation : </strong>
                        {users.occupation} 
                    </Typography>
                    <br/>
                    <Link to={`/photos/${users._id}`}>
                        <Button>PHOTOS</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;
