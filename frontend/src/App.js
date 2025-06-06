import './App.css';
import React, { useContext } from "react";
import { Grid, Paper } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserFeed from "./components/UserDetail/UserFeed";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import UploadPhoto from "./components/TopBar/UploadPhoto";
import { UserContext } from "./components/Context/UseContext";
import EditPhoto from "./components/UserPhotos/editPhoto";
import EditUserInfo from "./components/UserDetail/EditUser";

const AppContent = () => {
    const { user, isLoading } = useContext(UserContext);
    const location = useLocation();
    if (isLoading) return null;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TopBar />
            </Grid>
            <div className="main-topbar-buffer" />
            {user && (
                <Grid item sm={3}>
                    <Paper className="main-grid-item">
                        <UserList />
                    </Paper>
                </Grid>
            )}

            <Grid item sm={user ? 9 : 12}>
                <Paper className="main-grid-item">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                user
                                    ? <Navigate to={location.state?.from || `/users/${user._id}`} />
                                    : <LoginRegister />
                            }
                        />
                        <Route
                            path="/users/:userId"
                            element={user ? <UserDetail /> :
                                <Navigate to="/login" state={{ from: location.pathname }} />}
                        />
                        <Route
                            path="/photos/:userId"
                            element={user ? <UserPhotos /> :
                                <Navigate to="/login" state={{ from: location.pathname }} />}
                        />
                        <Route
                            path="/users"
                            element={user ? <UserList /> :
                                <Navigate to="/login" state={{ from: location.pathname }} />}
                        />
                        <Route
                            path="/upload"
                            element={user ? <UploadPhoto userId={user._id} /> :
                                <Navigate to="/login" state={{ from: location.pathname }} />}
                        />
                        <Route
                            path="/edit/:id"
                            element={user ? <EditPhoto  /> :
                                <Navigate to="/login" state={{ from: location.pathname }} />}
                        />
                        <Route
                            path="/users/:userId/edit"
                            element={user ? <EditUserInfo /> : <Navigate to="/login" />}
                        />
                        <Route path="/feed" element={<UserFeed />} />
                        <Route path="*" element={<Navigate to={user ? `/users/${user._id}` : "/login"} />} />
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AppContent;
