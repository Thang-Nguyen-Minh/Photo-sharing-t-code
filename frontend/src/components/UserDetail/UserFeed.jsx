import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import "./styles.css";
import axios from "axios";
import UserDetail from "./index";

function UserFeed() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                navigate("/"); // ⛔ Chưa đăng nhập thì điều hướng về login
                return;
            }
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
            <Typography variant="h4" >All users Feed</Typography>
            {users.map((user) => (
                <UserDetail key={user.id} user={user} />
            ))}
        </div>
    );
}

export default UserFeed;
