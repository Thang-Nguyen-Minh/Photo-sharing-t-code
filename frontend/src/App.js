import './App.css';
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister/LoginRegister";

const App = () => {
  const [user, setUser] = useState(null);

  // Tự động lấy user từ token nếu có
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetch("http://localhost:8080/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
          .then((res) => res.json())
          .then((data) => {
            if (data && data._id) setUser(data);
            else {
              localStorage.removeItem("accessToken");
              setUser(null);
            }
          })
          .catch(() => {
            localStorage.removeItem("accessToken");
            setUser(null);
          });
    }
  }, []);

  return (
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar user={user} setUser={setUser} />
            </Grid>

            <div className="main-topbar-buffer" />

            {user && (
                <Grid item sm={3}>
                  <Paper className="main-grid-item">
                    <UserList user={user} />
                  </Paper>
                </Grid>
            )}

            <Grid item sm={user ? 9 : 12}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route
                      path="/login"
                      element={
                        user ? <Navigate to={`/users/${user._id}`} /> : <LoginRegister setUser={setUser} />
                      }
                  />
                  <Route
                      path="/users/:userId"
                      element={
                        user ? <UserDetail user={user} /> : <Navigate to="/login" />
                      }
                  />
                  <Route
                      path="/photos/:userId"
                      element={
                        user ? <UserPhotos user={user} /> : <Navigate to="/login" />
                      }
                  />
                  <Route
                      path="/users"
                      element={
                        user ? <UserList user={user} /> : <Navigate to="/login" />
                      }
                  />
                  {/* Redirect bất kỳ URL nào khác về login */}
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
  );
};

export default App;
