import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function UserDetail({user : propUser}) {
    const { userId } = useParams();
    const [user, setUser] = useState(propUser|| null); // ✅ sửa từ [] -> null
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (propUser) return;
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                navigate("/"); // ⛔ Chưa đăng nhập thì điều hướng về login
                return;
            }
            try {
                const res = await axios.get(`http://localhost:8080/user/${userId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data) {
                    setUser(res.data);
                } else {
                    setError("User not found.");
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to fetch user data.");
            }
        };
        fetchUser();
    }, [userId,propUser]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!user) {
        return <Typography>Loading user information...</Typography>;
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5">User Information</Typography>
                    <Typography variant="body1"><strong>Name: </strong>
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body1"><strong>Location: </strong>
                        {user.location}
                    </Typography>
                    <Typography variant="body1"><strong>Description: </strong>
                        {user.description}
                    </Typography>
                    <Typography variant="body1"><strong>Occupation: </strong>
                        {user.occupation}
                    </Typography>
                    <br />
                    <Link to={`/photos/${user._id}`}>
                        <Button variant="contained">PHOTOS</Button>
                    </Link>

                    <Link to={`/users/${user._id}/edit`}>
                        <Button variant="outlined" sx={{ ml: 2 }}>Edit Info</Button>
                    </Link>

                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;
