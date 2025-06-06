import React, { useEffect, useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UseContext";
import "./styles.css";

function TopBar() {
    const { user, setUser } = useContext(UserContext);
    const [contextText, setContextText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split("/");
        const route = path[1];
        const userId = path[2];

        if (!userId) {
            setContextText(route === "login" ? "Login / Register" : "Photo Sharing App");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) return;

        axios
            .get(`http://localhost:8080/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const name = `${res.data.first_name} ${res.data.last_name}`;
                setContextText(route === "photos" ? `Photos of ${name}` : name);
            })
            .catch(() => setContextText(""));
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/");
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar className="topbar-toolbar">
                <div className="topbar-left">
                    {user ? (
                        <>
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                Hi {user.first_name}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => navigate("/login")}>Please Login</Button>
                    )}
                    {user && (
                        <Button color="inherit" onClick={() => navigate(`/upload`)}>
                            Add Photo
                        </Button>
                    )}
                </div>
                <div className="topbar-right">
                    <Typography variant="h6">{contextText}</Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
