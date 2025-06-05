import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";
function TopBar() {
    const [contextText, setContextText] = useState("");
    const location = useLocation();
    const path=location.pathname;

    useEffect(() => {
        const x=path.split("/");
        const id=x[2];
        if (x[1]==="users" || x[1]==="photos"){
            const users=models.userModel(id);
            const name=`${users.first_name} ${users.last_name}`
            if (x[1]==="photos") setContextText(`Photos of ${name}`);
            else setContextText(`${name}`);
        }
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
