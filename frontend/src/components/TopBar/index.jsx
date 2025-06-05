import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";
import axios from "axios";
function TopBar() {
    const [contextText, setContextText] = useState("");
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

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                <Typography variant="h5" color="inherit">
                    Photo Sharing App
                </Typography>
                <Typography variant="h5" color="inherit" style={{ marginLeft: "auto" }}>
                    {contextText}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
