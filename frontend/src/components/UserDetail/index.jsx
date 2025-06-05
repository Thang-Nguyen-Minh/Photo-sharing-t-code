import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null); // ✅ sửa từ [] -> null
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/user/${userId}`);
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
    }, [userId]);

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
                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;
