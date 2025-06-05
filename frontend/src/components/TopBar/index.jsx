import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography,Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function TopBar({user,setUser}) {
    // const [contextText, setContextText] = useState("");
    // const [user,setUser] = useState([]);
    // const location = useLocation();
    // const path=location.pathname;
    // const x=path.split("/");
    // const userId=x[2];
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const res= await axios.get(`http://localhost:8080/user/${userId}`);
    //             setUser(res.data);
    //             const name=`${res.data.first_name} ${res.data.last_name}`;
    //             if (x[1]==="photos") setContextText(`Photos of ${name}`);
    //             else setContextText(`${name}`);
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }
    //     fetchData();
    // },[location]);
    const location = useLocation();
    const navigate = useNavigate();

    const pathParts = location.pathname.split("/");
    const contextText =
        user && pathParts[1] === "photos"
            ? `Photos of ${user.first_name} ${user.last_name}`
            : user && pathParts[1] === "users"
                ? `${user.first_name} ${user.last_name}`
                : "";

    const handleLogout = () => {
        localStorage.removeItem("accessToken");  // Xóa token
        setUser(null);                           // Reset user info
        navigate("/");                           // Redirect về login
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    PhotoSharing App {contextText && ` - ${contextText}`}
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
                    <Button color="inherit" onClick={() => navigate("/login")}>
                        Please Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
