import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            try {
                const res = await axios.get("http://localhost:8080/user/list", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(res.data);
            } catch (err) {
                console.log("❌ Error fetching user list:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Typography variant="body1">User List</Typography>
            <List>
                {Array.isArray(users) &&
                    users.map((user) => (
                        <React.Fragment key={user._id}>
                            <ListItem>
                                <Link to={`/users/${user._id}`}>
                                    <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                                </Link>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
            </List>
        </div>
    );
}

export default UserList;
