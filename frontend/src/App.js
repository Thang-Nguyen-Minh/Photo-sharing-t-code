import './App.css';
import React, { useContext } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister/LoginRegister";

import { UserContext } from "./components/Context/UseContext"; // ✅ import context

const App = () => {
    const { user } = useContext(UserContext); // ✅ lấy từ context
    return (
            <div>
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
                                        user ? <Navigate to={`/users/${user._id}`} /> : <LoginRegister />
                                    }
                                />
                                <Route
                                    path="/users/:userId"
                                    element={
                                        user ? <UserDetail /> : <Navigate to="/login" />
                                    }
                                />
                                <Route
                                    path="/photos/:userId"
                                    element={
                                        user ? <UserPhotos /> : <Navigate to="/login" />
                                    }
                                />
                                <Route
                                    path="/users"
                                    element={
                                        user ? <UserList /> : <Navigate to="/login" />
                                    }
                                />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </Routes>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

    );
};

export default App;
