import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography,Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function TopBar() {
    const [contextText, setContextText] = useState("");
    const [user,setUser] = useState([]);
    const location = useLocation();
    const path=location.pathname;
    const x=path.split("/");
    const userId=x[2];

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res= await axios.get(`http://localhost:8080/user/${userId}`);
                setUser(res.data);
                const name=`${res.data.first_name} ${res.data.last_name}`;
                if (x[1]==="photos") setContextText(`Photos of ${name}`);
                else setContextText(`${name}`);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[location]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");  // Xóa token
        setUser(null);                           // Reset user info
        navigate("/");                           // Redirect về login
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    PhotoSharing App
                </Typography>
                {user ? (
                    <>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            Hi {user.first_name}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Typography variant="body1">Please login</Typography>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
