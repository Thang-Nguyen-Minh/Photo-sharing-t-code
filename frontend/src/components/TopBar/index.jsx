import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";

function TopBar() {

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
