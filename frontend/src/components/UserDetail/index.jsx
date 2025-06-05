import React, {useEffect, useState} from "react";
import {Typography, Card, CardContent, Button} from "@mui/material";
import "./styles.css";
import {Link, useParams} from "react-router-dom";
import UserList from "../UserList";
import models from "../../modelData/models";
import axios from "axios";
function UserDetail() {
    const {userId} = useParams();
    //const users = models.userModel(userId);
    const [users, setUsers] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8080/user/${userId}`)
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
    },[userId])

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
