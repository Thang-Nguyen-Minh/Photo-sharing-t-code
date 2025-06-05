import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography,Button } from "@mui/material";
import "./styles.css";
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";

function TopBar() {
    const [contextText, setContextText] = useState("");
    const [user,setUser] = useState([]);
    const location = useLocation();
    const path=location.pathname;
    const x=path.split("/");
    const userId=x[2];
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return; // bỏ qua nếu không có userId
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get(`http://localhost:8080/user/${userId}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                });
                setUser(res.data);
                const name = `${res.data.first_name} ${res.data.last_name}`;
                if (x[1] === "photos") setContextText(`Photos of ${name}`);
                else setContextText(name);
            } catch (err) {
                console.log("❌ Fetch user failed:", err.response?.data || err.message);
            }
        };
        fetchData();
    }, [location]);


    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");  // Xóa token
        setUser(null);                           // Reset user info
        navigate("/");                           // Redirect về login
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar className="topbar-toolbar">
                <div className="topbar-left">
                    <Typography variant="h6">Nguyễn Minh Phúc</Typography>
                </div>
                <div className="topbar-center">
                {user ? (
                    <>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            Hi {user.first_name} {user.last_name}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={() => navigate("/login")}>
                        Please Login
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
